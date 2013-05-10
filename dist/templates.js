var templates = {"app":"<%\n  var editMode = false;\n  if (mode === 'edit' || mode === 'blob' || mode === 'new') editMode = true;\n%>\n\n<div class='prose-menu dropdown-menu'>\n  <div class='inner'>\n    <a href='/' class='icon branding dropdown-hover' data-link=true>Prose</a>\n    <ul class='dropdown'>\n      <li><a class='about' href='./#about'>About</a></li>\n      <li><a class='help' href='https://github.com/prose/prose'>Developers</a></li>\n      <li class='divider'></li>\n      <li><a href='#'>Prose v1.0.0</a></li>\n    </ul>\n  </div>\n</div>\n\n<div class='limiter'>\n  <div id='heading' class='heading clearfix'></div>\n</div>\n<div class='limiter'>\n  <div id='content' class='application content'></div>\n</div>\n\n<% if (!error) { %>\n  <div id='drawer' class='sidebar'></div>\n<% } %>\n\n<% if (!error) { %>\n  <div class='vert navigation<% if (editMode) { %> editing<% } %>'>\n    <ul class='project nav'>\n      <li>\n        <a href='#' class='ico round repos <% if (!mode) { %>active<% } %>'>\n          <span class='popup round arrow-right'>Explore Projects</span>\n        </a>\n      </li>\n      <% if (repo) { %>\n        <li>\n        <a href='#<%= user %>/<%= repo %>/tree/<%= branch %>' class='ico round folder <% if (mode === \"tree\") { %>active<% } %>'>\n            <span class='popup round arrow-right'><%= repo %></span>\n          </a>\n        </li>\n        <% if (window.authenticated) { %>\n          <li>\n            <a href='#<%= user %>/<%= repo %>/new/<%= branch %><%= path ? \"/\"+path : \"\"%>' class='ico round new new-file'>\n              <span class='popup round arrow-right'>New File</span>\n            </a>\n          </li>\n        <% } %>\n      <% } %>\n    </ul>\n\n    <% if (editMode) { %>\n    <ul class='post-views nav'>\n      <li>\n        <a href='#' class='ico round pencil edit' data-state='edit'>\n          <span class='popup round arrow-right'>Edit</span>\n        </a>\n      </li>\n      <% if (markdown || mode === 'new') { %>\n        <li>\n          <a href='#' class='ico round eye preview' data-state='preview'<% if (jekyll) { %>data-jekyll=true<% } %>>\n            <span class='popup round arrow-right'>Preview</span>\n          </a>\n        </li>\n      <% } %>\n\n      <% if (window.authenticated) { %>\n        <% if (jekyll) { %>\n        <li>\n          <a href='#' class='ico round metadata meta' data-state='meta'>\n            <span class='popup round arrow-right'>Meta Data</span>\n          </a>\n        </li>\n        <% } %>\n      <li>\n        <a href='#' class='ico round sprocket settings' data-state='settings' data-drawer=true>\n          <span class='popup round arrow-right'>Post Settings</span>\n        </a>\n      </li>\n      <% } %>\n    </ul>\n    <% } %>\n\n    <ul class='auth nav'>\n      <% if (window.authenticated) { %>\n      <li>\n        <a href='#' class='ico round switch logout'>\n          <span class='popup round arrow-right'>Logout <%= app.username %></span>\n        </a>\n      </li>\n      <% } else { %>\n      <li>\n      <a class='ico round switch login' href='<%= auth.site %>/login/oauth/authorize?client_id=<%= auth.id %>&scope=repo,user,gist&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>\n          <span class='popup round arrow-right'>Sign in using GitHub</span>\n        </a>\n      </li>\n      <% } %>\n    </ul>\n  </div>\n<% } %>\n","button":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <button class='round <%= name %>' type='button' name='<%= name %>' value='<%= value %>' data-on='<%= on %>' data-off='<%= off %>'>\n    <% print(value ? on : off); %>\n  </button>\n</div>\n","checkbox":"<div class='form-item'>\n  <input type='checkbox' name='<%= name %>' value='<%= value %>'<% print(checked ? 'checked' : '') %> />\n  <label class='aside' for='<%= name %>'><%= label %></label>\n</div>\n","directories":"<li class='directory'>\n  <a\n    class='clearfix item'\n    data-index='<%= index %>'\n    data-navigate='#<%= user %>/<%= repo %>/tree/<%= branch %><%= path %>'\n    href='#<%= user %>/<%= repo %>/tree/<%= branch %><%= path %>'>\n\n    <span class='icon fl round folder'></span>\n    <span class='details fl'>\n      <h3 class='title'><%= name %></h3>\n    </span>\n  </a>\n</li>\n","files":"<li class='clearfix item'\n    <% if (!isBinary) { %>data-navigate='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'<% } %>\n    data-index='<%= index %>'>\n\n  <% if (isBinary) { %>\n    <div class='fl icon round <%= extension %> <% if (isMedia) { %>media<% } %>'></div>\n  <% } else { %>\n  <a href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'>\n    <span class='fl icon round <%= extension %> <% if (isMedia) { %>media<% } %>'></span>\n  </a>\n  <% } %>\n\n  <div class='fl details'>\n    <% if (isBinary) { %>\n      <h3 class='title'><%= name %></h3>\n    <% } else { %>\n        <% if (extension === 'md') { %>\n          <a class='clearfix' href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'>\n            <h3><%= filename %></h3>\n            <span class='deemphasize'><%= name %></span>\n          </a>\n        <% } else { %>\n          <h3 class='title'><a class='clearfix'href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'><%= name %></a></h3>\n        <% } %>\n      </a>\n    <% } %>\n  </div>\n\n  <div class='actions cleafix'>\n    <% if (!isBinary) { %>\n      <a class='clearfix'\n        title='Edit this File'\n        href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'>\n        Edit\n      </a>\n    <% } %>\n    <% if (authenticated && writePermissions) { %>\n      <a\n        class='delete ico inline rubbish small'\n        title='Delete this File'\n        data-user='<%= user %>'\n        data-repo='<%= repo %>'\n        data-branch='<%= branch %>'\n        data-file='<%= name %>'\n        href='#'>\n        <span class='popup round arrow-right'>Delete this file?</span>\n      </a>\n    <% } %>\n  </div>\n</li>\n","heading":"<% if (alterable) { %>\n  <a href='#' class='avatar save-action round fl'>\n    <span class='ico status'></span>\n\n    <% if (writeable) { %>\n      <span class='popup round arrow-left'>Ctrl&nbsp;+&nbsp;S</span>\n    <% } else { %>\n      <span class='popup round arrow-left'>Submit Change</span>\n    <% } %>\n\n    <%= avatar %>\n  </a>\n  <div class='fl details'>\n    <h4 class='parent-trail'><%= parentTrail %><% if (isPrivate) { %><span class='ico small inline private' title='Private Project'></span><% } %></h4>\n    <input type='text' class='filepath' value='<%= title %>'>\n    <div class='mask'></div>\n  </div>\n<% } else { %>\n  <div class='avatar round fl'><%= avatar %></div>\n  <div class='fl details'>\n    <h4><a class='user' href='#<%= parentUrl %>'><%= parent %></a></h4>\n    <h2><a class='repo' href='#<%= titleUrl %>'><%= title %></a></h2>\n  </div>\n<% } %>\n","loading":"<div class='loading clearfix'>\n  <div class='loading-icon fl'></div>\n  <span class='fl'><%= message %></span>\n</div>\n","multiselect":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <select name='<%= name %>' data-placeholder='<%= placeholder %>' multiple class='chzn-select'>\n    <% _(options).each(function(o) { %>\n      <% if (!o.lang || o.lang === lang) { %>\n        <% if (o.name) { %>\n         <option value='<%= o.value %>'><%= o.name %></option>\n        <% } else if (o.value) { %>\n         <option value='<%= o.value %>'><%= o.value %></option>\n        <% } else { %>\n         <option value='<%= o %>' selected='selected'><%= o %></option>\n        <% } %>\n      <% } %>\n    <% }); %>\n  </select>\n</div>\n","notification":"<% if (!window.authenticated) { %>\n  <div class='notify <%= type %>'>\n    <h2 class='icon landing error'>Prose</h2>\n    <div class='inner'>\n      <p>Please login with your GitHub account to access that project.</p>\n      <p><a class='button round' href='<%= auth.site %>/login/oauth/authorize?client_id=<%= auth.id %>&scope=repo, user&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>Authorize with GitHub</a></a>\n    </div>\n  </div>\n<% } else { %>\n  <div class='notify <%= type %>'>\n    <h2 class='icon landing error'>Prose</h2>\n    <div class='inner'>\n      <p><%= message %></p>\n      <% if (pathFromFile) { %>\n        <p><a class='button round create' href='#'>Create it </a></p>\n      <% } %>\n      <p><a class='button round' href='#'>Go back </a></p>\n    </div>\n  </div>\n<% } %>\n","post":"<div class='inner editor views<% if (markdown) { %> markdown<% } %>'>\n  <div id='diff' class='view prose diff'></div>\n  <% if (jekyll) { %>\n    <div id='meta' class='view round meta'>\n      <div class='form'></div>\n    </div>\n  <% } %>\n  <div id='edit' class='view active edit'>\n    <div class='topbar-wrapper'>\n      <div class='topbar toolbar round'>\n        <% if (jekyll && !metadata.published) { %>\n          <a href='#' class='fr flag unpublished-flag'><em>Unpublished</em></a>\n        <% } %>\n        <div class='options clearfix'>\n          <a href='#' class='save-action round fl'>\n            <span class='ico status'></span>\n\n            <% if (writeable) { %>\n              <span class='popup round arrow-top'>Ctrl&nbsp;+&nbsp;S</span>\n            <% } else { %>\n              <span class='popup round arrow-top'>Submit Change</span>\n            <% } %>\n\n            <%= avatar %>\n          </a>\n          <% if (markdown) { %>\n            <ul class='group round markdown-snippets clearfix'>\n              <li><a href='#' title='Heading' data-key='heading' data-snippet='<% print(\"# Heading\\n\\n\") %>'>h1</a></li>\n              <li><a href='#' title='Sub Heading' data-key='sub-heading' data-snippet='<% print(\"## Sub Heading\\n\\n\") %>'>h2</a></li>\n            </ul>\n            <ul class='group round markdown-snippets clearfix'>\n              <li><a class='ico small link' title='Insert Link' href='#' data-key='link' data-snippet='<% print(\"[Google](http://google.com)\\n\\n\") %>'></a></li>\n              <li><a class='ico small picture' title='Insert Image' href='#' data-key='image' data-snippet='<% print(\"![picture alt](http://placekitten.com/200/300)\\n\\n\") %>'></a></li>\n            </ul>\n            <ul class='group round markdown-snippets clearfix'>\n              <li><a href='#' title='Bold' data-key='bold' data-snippet='**text**'>B</a></li>\n              <li><a class='ico small italic' data-key='italic' href='#' title='Italic' data-snippet='_text_'></a></li>\n            </ul>\n            <ul class='group round markdown-snippets clearfix'>\n              <li><a class='ico small quote' title='Blockquote' href='#' data-key='quote' data-snippet='<% print(\"> We loved with a love that was more than love\\n\\n\"); %>'></a></li>\n              <li><a class='ico small list' href='#' title='List' data-key='list' data-snippet='<% print(\"- item\\n- item\\n- item\\n\\n\"); %>'></a></li>\n              <li><a class='ico small numbered-list' href='#' title='Numbered List' data-key='numbered-list' data-snippet='<% print(\"1. item\\n2. item\\n3. item\\n\\n\"); %>'></a></li>\n            </ul>\n            <ul class='group round clearfix'>\n              <li><a class='ico small round question' href='http://daringfireball.net/projects/markdown/syntax' target='_blank'>\n              <span class='popup round arrow-top'>More About Markdown</span>\n              </a></li>\n            </ul>\n          <% } %>\n        </div>\n      </div>\n    </div>\n    <div id='code'></div>\n  </div>\n  <% if (markdown) { %>\n    <div id='preview' class='view preview prose'><%- preview %></div>\n  <% } %>\n</div>\n","posts":"<div class='topbar-wrapper'>\n  <div class='topbar'>\n    <div class='content-search'>\n      <span class='ico search inline fr'></span>\n      <input type='text' id='filter' placeholder='Filter Files' />\n    </div>\n  </div>\n</div>\n\n<div class='listing'>\n  <% if (path.length && path !== jailed) { %>\n    <div class='breadcrumb'>\n      <a class='branch' href='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'>..</a>\n      <% _.each(_.chunkedPath(path), function(p) { %>\n        <% if (p.name !== jailed) { %>\n          <span class='slash'>/</span>\n          <a class='path' href='#<%= [user, repo, \"tree\", branch, p.url].join(\"/\") %>'><%= p.name %></a>\n        <% } %>\n      <% }); %>\n    </div>\n  <% } %>\n\n  <ul id='files'></ul>\n</div>\n","profile":"<div class='topbar-wrapper'>\n  <div class='topbar content-search'>\n    <span class='ico search inline fr'></span>\n    <input type='text' id='filter' placeholder='Filter projects' />\n  </div>\n</div>\n\n<ul id='projects' class='projects listing'></ul>\n","projects":"<li class='item clearfix'\n    data-navigate='#<%= owner.login %>/<%= name %>'\n    data-index='<%= index %>'>\n\n    <a\n      data-user='<%= owner.login %>'\n      data-repo='<%= name %>'\n      href='#<%= owner.login %>/<%= name %>'>\n      <% if (app.state.user === app.username && (owner.login !== app.username && private)) { %>\n        <span class='fl icon round repo owner private' title='Shared from the account (<%= owner.login %>)'></span>\n      <% } else if (app.state.user === app.username && owner.login !== app.username) { %>\n        <span class='fl icon round repo owner' title='Shared from the account (<%= owner.login %>)'></span>\n      <% } else if (fork && private) { %>\n        <span class='fl icon round repo private fork' title='Forked from another project'></span>\n      <% } else if (fork) { %>\n        <span class='fl icon round repo fork' title='Forked from another project'></span>\n      <% } else if (private) { %>\n        <span class='fl icon round repo private'></span>\n      <% } else { %>\n        <span class='fl icon round repo'></span>\n      <% } %>\n    </a>\n\n    <div class='details fl'>\n      <a\n        data-user='<%= owner.login %>'\n        data-repo='<%= name %>'\n        href='#<%= owner.login %>/<%= name %>'>\n        <h3<% if (!description) { %> class='title'<% } %>><%= name %></h3>\n        <span class='deemphasize'><%= description %></span>\n      </a>\n    </div>\n\n    <div class='fr actions clearfix'>\n      <a\n        data-user='<%= owner.login %>'\n        data-repo='<%= name %>'\n        href='#<%= owner.login %>/<%= name %>'>\n        View Project\n      </a>\n      <% if (homepage) { %>\n        <a href='//<%= homepage %>'>View Site</a>\n      <% } %>\n    </div>\n</li>\n","select":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <select name='<%= name %>' data-placeholder='<%= placeholder %>' class='chzn-select'>\n    <% _(options).each(function(o) { %>\n      <% if (!o.lang || o.lang === lang) { %>\n        <% if (o.name) { %>\n         <option value='<%= o.value %>'><%= o.name %></option>\n        <% } else { %>\n         <option value='<%= o.value %>'><%= o.value %></option>\n        <% } %>\n      <% } %>\n    <% }); %>\n  </select>\n</div>\n","settings":"<% if (window.authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Post Settings</h2>\n  </div>\n  <div class='inner authoring'>\n    <div class='commit'>\n      <textarea class='commit-message' placeholder='Describe your Changes'></textarea>\n      <a class='ico small cancel round' href='#'>\n        <span class='popup round arrow-right'>Cancel</span>\n      </a>\n    </div>\n\n    <a class='save button round' href='#'>\n      <%= writeable ? 'Save' : 'Submit Change' %>\n      <span class='popup round arrow-right'>Ctrl&nbsp;+&nbsp;s</span>\n    </a>\n\n    <% if (app.state.config && app.state.config.languages) { %>\n      <% _(app.state.config.languages).each(function(lang) { %>\n        <% if (lang.value && (metadata && metadata.lang !== lang.value)) { %>\n          <a class='translate round button' href='#<%= lang.value %>'>Translate to <%= lang.name %></a>\n        <% } %>\n      <% }); %>\n    <% } %>\n\n    <% if (app.state.mode !== 'new') { %>\n      <a class='delete button round' href='#'>Delete this File</a>\n    <% } %>\n  </div>\n<% } %>\n","sidebarOrganizations":"\n\n\n<% if (authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Groups</h2>\n  </div>\n  <ul class='listing'>\n  <% if (organizations && organizations.length) { %>\n    <li>\n      <a href='#<%= app.username %>' title='<%= app.username %>'<% if (app.state.user === app.username) { %> class='active'<% } %>>\n        <span class='ico repos inline small'></span>\n        <%= app.username %>\n      </a>\n    </li>\n    <% _.each(organizations, function(org) { %>\n    <li>\n    <a href='#<%= org.login %>' title='<%= org.login %>'<% if (app.state.user === org.login) { %> class='active'<% } %>'>\n        <span class='ico repos inline small'></span>\n        <%= org.login %>\n      </a>\n    </li>\n    <% }); %>\n  <% } %>\n  </ul>\n<% } %>\n","sidebarProject":"<div class='inner'>\n  <% if (app.state.branches.length > 0) { %>\n    <h2 class='label'>Switch Branch</h2>\n    <select data-placeholder='Current Branch Name' class='chzn-select'>\n        <option value='#<%= [user, repo, \"tree\", branch].join(\"/\") %>' selected><%= branch %></option>\n      <% _.each(branches, function(branch) { %>\n        <option value='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'><%= branch %></option>\n      <% }); %>\n    </select>\n  <% } %>\n</div>\n<% if (authenticated) { %>\n<% if (history &&\n        history.user === user &&\n        history.repo === repo &&\n        history.branch === branch &&\n        history.recent &&\n        history.recent[app.username]) { %>\n    <div class='history'>\n      <div class='inner'>\n        <h2 class='label inner'>Your Recent History</h2>\n      </div>\n      <ul id='recent' class='listing'>\n        <%\n          var recent = history.recent[app.username];\n          var rooturl = (app.state.config && app.state.config.prose) ? app.state.config.prose.rooturl : undefined; \n          if (rooturl) {\n            recent = recent.filter(function(item) {\n              return item.indexOf(rooturl) > -1;\n            });\n          }\n        %>\n        <% _.each(recent.slice(0,5), function(filename) { \n            var status = history.commits[filename][0].status;\n        %>\n        <li><a class='item <%= status %>' title='<%= status %>: <%= filename %>' href='#<%= [user, repo, \"edit\", branch, filename].join(\"/\") %>' data-path='<%= filename %>'>\n            <span class='ico small inline <%= status %>'></span>\n            <% if (status === 'removed') { %>\n              <span class='overlay'>\n                <span class='ico small inline <%= status %>'></span>\n                Restore?\n              </span>\n            <% } %>\n            <%= filename %>\n          </a></li>\n        <% }); %>\n      </ul>\n    </div>\n  <% } %>\n<% } %>\n","start":"<% if (!authenticated) { %>\n  <div class='round splash'>\n    <h2 class='icon landing'>Prose</h2>\n    <div class='inner'>\n      <p>Prose is a content editor for GitHub designed for managing websites.</p>\n      <p><a href='/about.html'>Learn more</a></p>\n      <a class='round button' href='<%= auth.site %>/login/oauth/authorize?client_id=<%= auth.id %>&scope=repo,user,gist'>Authorize with GitHub</a>\n    </div>\n  </div>\n<% } %>\n","text":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <input type='text' name='<%= name %>' value='<%= value %>' />\n</div>\n"}; module.exports = templates;