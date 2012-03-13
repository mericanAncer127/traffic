(function(config, models, views, routers, utils) {

// The Router
// ---------------

routers.Application = Backbone.Router.extend({
  initialize: function() {
    
    // Using this.route, because order matters
    this.route(/(.*\/.*)/, 'post', this.post);
    this.route(":repo/posts", "posts", app.instance.posts);
    this.route(":repo/new", "new", app.instance.newPost);
    this.route("", "start", app.instance.start);
  },
  post: function(url) {
    url = url.split('/');
    var repo = url.slice(0, 1).join('/');
    var path = (url.slice(1) || []).join('/');
    app.instance.post(repo, path);
  }
});

}).apply(this, window.args);
