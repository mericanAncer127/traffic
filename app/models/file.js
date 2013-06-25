var _ = require('underscore');
var Backbone = require('backbone');
var jsyaml = require('js-yaml');
var util = require('.././util');

module.exports = Backbone.Model.extend({
  idAttribute: 'sha',

  uploads: [],

  constructor: function(attributes, options) {
    Backbone.Model.call(this, {
      branch: attributes.branch,
      collection: attributes.collection,
      model: attributes.model,
      path: attributes.path,
      repo: attributes.repo,
      sha: attributes.sha,
      type: attributes.type,
      content_url: attributes.url
    });
  },

  initialize: function(attributes, options) {
    _.bindAll(this);

    var extension;
    
    this.branch = attributes.branch;
    this.collection = attributes.collection;
    this.repo = attributes.repo;

    // TODO: clean this up using _.defaults
    if (!this.isNew()) {
      extension = util.extension(attributes.path);
    }

    // Default to gfm and markdown for new files
    this.set({
      'extension': extension,
      'binary': extension ? util.isBinary(extension) : false,
      'lang': extension ? util.mode(extension) : 'gfm',
      'media': extension ? util.isMedia(extension) : false,
      'markdown': extension ? util.isMarkdown(extension) : true,
      'name': this.isNew() ? '' : util.extractFilename(attributes.path)[1],
      'writable': this.repo.get('permissions').push
    });
  },

  parse: function(resp, options) {
    if (typeof resp === 'string') {
      return this.parseContent(resp);
    } else if (typeof resp === 'object') {
      // TODO: whitelist resp JSON
      return _.omit(resp, 'content');
    }
  },

  parseContent: function(resp, options) {
    // Extract YAML from a post, trims whitespace
    resp = resp.replace(/\r\n/g, '\n'); // normalize a little bit

    var hasMetadata = !!util.hasMetadata(resp);

    if (!hasMetadata) return {
      content: resp,
      metadata: false,
      previous: resp
    };

    var res = {
      previous: resp
    };

    res.content = resp.replace(/^(---\n)((.|\n)*?)---\n?/, function(match, dashes, frontmatter) {
      try {
        // TODO: _.defaults for each key
        res.metadata = jsyaml.load(frontmatter);

        // Default to published unless explicitly set to false
        res.metadata.published = !frontmatter.match(/published: false/);
      } catch(err) {
        console.log('ERROR encoding YAML');
      }

      return '';
    }).trim();

    return res;
  },

  getContent: function(options) {
    options = options ? _.clone(options) : {};
    Backbone.Model.prototype.fetch.call(this, _.extend(options, {
      dataType: 'text',
      headers: {
        'Accept': 'application/vnd.github.raw'
      },
      url: this.get('content_url')
    }));
  },

  serialize: function() {
    var metadata;
    var content = this.get('content');

    try {
      metadata = jsyaml.dump(this.get('metadata')).trim();
    } catch(err) {
      throw err;
    }

    if (metadata) {
      return ['---', metadata, '---'].join('\n') + '\n\n' + content;
    } else {
      return content;
    }
  },

  encode: function(content) {
    // Encode UTF-8 to Base64
    // https://developer.mozilla.org/en-US/docs/Web/API/window.btoa#Unicode_Strings
    return window.btoa(window.unescape(window.encodeURIComponent(content)));
  },

  decode: function(content) {
    // Decode Base64 to UTF-8
    // https://developer.mozilla.org/en-US/docs/Web/API/window.btoa#Unicode_Strings
    return window.decodeURIComponent(window.escape(window.atob(content)));
  },

  toJSON: function() {
    // Override default toJSON method to only send necessary data to GitHub
    var path = this.get('path');
    var content = this.serialize();

    var data = {
      path: path,
      message: (this.isNew() ?
        t('actions.commits.created', { filename: path }) :
        t('actions.commits.updated', { filename: path })),
      content: this.encode(content),
      branch: this.branch.get('name')
    };

    // Set sha if modifying existing file
    if (!this.isNew()) data.sha = this.get('sha');

    return data;
  },

  fetch: function(options) {
    // TODO: handle these two AJAX requests using deferreds, call 'success' callback after both complete
    Backbone.Model.prototype.fetch.call(this, _.omit(options, 'success', 'error', 'complete'));
    this.getContent.apply(this, arguments);
  },

  save: function(attributes, options) {
    // TODO: set method to PUT even when this.isNew()
    Backbone.Model.prototype.save.apply(this, arguments);
  },

  destroy: function(options) {
    options = _.clone(options) || {};

    var path = this.get('path');

    var data = {
      path: path,
      message: t('actions.commits.deleted', { filename: path }),
      sha: this.get('sha'),
      branch: this.branch.get('name')
    };

    var params = _.map(_.pairs(data), function(param) { return param.join('='); }).join('&');

    Backbone.Model.prototype.destroy.call(this, _.extend(options, {
      url: this.url() + '&' + window.escape(params),
      error: function(model, xhr, options) {
        console.log(model, xhr, options);
      }
    }));
  },

  url: function() {
    return this.repo.url() + '/contents/' + this.get('path') + '?ref=' + this.branch.get('name');
  },

  validate: function(attributes, options) {
    // Fail validation if path conflicts with another file in repo
    if (this.collection.where({ path: attributes.path }).length > 1) return 'Path Conflict';
  }
});
