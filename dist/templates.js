var templates = {"app":"<div class='prose-menu dropdown-menu'>\n  <div class='inner'>\n    <a href='./' class='icon branding dropdown-hover'>Prose</a>\n    <ul class='dropdown'>\n      <li><a class='help' href='./help.html'>Help</a></li>\n      <li><a class='about' href='./about.html'>About</a></li>\n      <li class='divider'></li>\n      <li><a href='https://github.com/prose/prose#readme'>Prose v1.0.0</a></li>\n    </ul>\n  </div>\n</div>\n\n<div id='heading' class='heading limiter clearfix'></div>\n<div id='content' class='application content limiter'></div>\n<div id='drawer' class='sidebar'></div>\n\n<div class='vert navigation'>\n  <ul class='project nav'>\n    <li>\n      <a href='/' class='icon round repos <% if (!app.state.mode) { %>active<% } %>'>\n        <span class='popup round arrow-right'>Explore Projects</span>\n      </a>\n    </li>\n    <% if (state.repo) { %>\n      <li>\n      <a href='#<%= user %>/<%= repo %>/tree/<%= branch %>' class='icon round repo <% if (app.state.mode === \"tree\") { %>active<% } %>'>\n          <span class='popup round arrow-right'><%= repo %></span>\n        </a>\n      </li>\n      <% if (window.authenticated) { %>\n        <li>\n          <a href='#<%= user %>/<%= repo %>/new/<%= branch %><%= path ? \"/\"+path : \"\"%>' class='icon round new new-file'>\n            <span class='popup round arrow-right'>New File</span>\n          </a>\n        </li>\n      <% } %>\n    <% } %>\n  </ul>\n\n  <% if (state.mode === 'edit' || state.mode === 'blob' || state.mode === 'new') { %>\n  <ul class='post-views nav'>\n    <li>\n      <a href='#' class='icon round edit' data-state='edit'>\n        <span class='popup round arrow-right'>Edit</span>\n      </a>\n    </li>\n    <% if (state.markdown || state.mode === 'new') { %>\n      <li>\n        <a href='#' class='icon round preview' data-state='preview'<% if (jekyll) { %>data-jekyll=true<% } %>>\n          <span class='popup round arrow-right'>Preview</span>\n        </a>\n      </li>\n    <% } %>\n\n    <% if (window.authenticated) { %>\n      <% if (jekyll) { %>\n      <li>\n        <a href='#' class='icon round meta' data-state='meta'>\n          <span class='popup round arrow-right'>Meta Data</span>\n        </a>\n      </li>\n      <% } %>\n    <li>\n      <a href='#' class='icon round settings' data-state='settings' data-drawer=true>\n        <span class='popup round arrow-right'>Post Settings</span>\n      </a>\n    </li>\n    <% } %>\n  </ul>\n  <% } %>\n\n  <ul class='auth nav'>\n    <% if (window.authenticated) { %>\n    <li>\n      <a href='#' class='icon round auth logout'>\n        <span class='popup round arrow-right'>Logout <%= app.username %></span>\n      </a>\n    </li>\n    <% } else { %>\n    <li>\n      <a class='icon round auth login' href='https://github.com/login/oauth/authorize?client_id=<%= window.app.auth.id %>&scope=repo,user,gist&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>\n        <span class='popup round arrow-right'>Sign in using GitHub</span>\n      </a>\n    </li>\n    <% } %>\n  </ul>\n</div>\n","directories":"<li class='directory'>\n  <a\n    class='clearfix item'\n    data-index='<%= index %>'\n    data-navigate='#<%= user %>/<%= repo %>/tree/<%= branch %><%= path %>'\n    href='#<%= user %>/<%= repo %>/tree/<%= branch %><%= path %>'>\n\n    <span class='icon fl round folder'></span>\n    <span class='details fl'>\n      <h3 class='title'><%= name %></h3>\n    </span>\n  </a>\n</li>\n","files":"<li class='clearfix item'\n    data-navigate='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'\n    data-index='<%= index %>'>\n\n  <div class='fl icon round <%= extension %> <% if (isBinary) { %>media<% } %>'></div>\n  <div class='fl details'>\n    <% if (isBinary) { %>\n      <h3 class='title'><%= name %></h3>\n    <% } else { %>\n        <% if (extension === 'md') { %>\n          <h3><a class='clearfix'href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'><%= filename %></a></h3>\n          <span class='deemphasize'><%= name %></span>\n        <% } else { %>\n        <h3 class='title'><a class='clearfix'href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'><%= name %></a></h3>\n        <% } %>\n      </a>\n    <% } %>\n  </div>\n\n  <div class='fr actions cleafix'>\n    <% if (!isBinary) { %>\n      <a class='clearfix'\n        title='Edit this File'\n        href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'>\n        Edit\n      </a>\n    <% } %>\n    <a\n      class='delete'\n      title='Delete this File'\n      data-user='<%= user %>'\n      data-repo='<%= repo %>'\n      data-branch='<%= branch %>'\n      data-file='<%= name %>'\n      href='#'>\n      <span\n        class='bin icon inline small'\n        data-user='<%= user %>'\n        data-repo='<%= repo %>'\n        data-branch='<%= branch %>'\n        data-file='<%= name %>'>\n        Delete\n      </span>\n    </a>\n  </div>\n</li>\n","heading":"<% if (alterable) { %>\n  <div class='avatar round fl'><%= avatar %></div>\n  <div class='fl details'>\n    <h4><a class='user' href='#<%= parentUrl %>'><%= parent %></a></h4>\n    <input type='text' class='filepath' value='<%= title %>'>\n    <div class='mask'></div>\n  </div>\n<% } else { %>\n  <div class='avatar round fl'><%= avatar %></div>\n  <div class='fl details'>\n    <h4><a class='user' href='#<%= parentUrl %>'><%= parent %></a></h4>\n    <h2><a class='repo' href='#<%= titleUrl %>'><%= title %></a></h2>\n  </div>\n<% } %>\n","multiselect":"<label for='<%= name %>'><%= label %></label>\n<select name='<%= name %>' data-placeholder='<%= placeholder %>' multiple class='chzn-select'>\n  <% _(options).each(function(o) { %>\n    <% if (o.name) { %>\n     <option value='<%= o.value %>'><%= o.name %></option>\n    <% } else { %>\n     <option value='<%= o.value %>'><%= o.value %></option>\n    <% } %>\n  <% }); %>\n</select>\n","notification":"<% if (!window.authenticated) { %>\n<div class='notify <%= type %>'>\n  <div class='inner'>\n    Please login with your GitHub account to access that project.\n    <p><a class='button round' href='https://github.com/login/oauth/authorize?client_id=<%= window.app.auth.id %>&scope=repo, user&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>Sign in</a></a>\n  </div>\n</div>\n<% } else { %>\n  <div class='notify <%= type %>'>\n    <div class='inner'>\n      <p><%= message %></p>\n      <p><a class='button create' href='#'>Create it </a></p>\n      <p><a class='button round' href='../'>Go back </a></p>\n    </div>\n  </div>\n<% } %>\n","post":"<div class='topbar toolbar'>\n  <div class='inner clearfix'>\n    <% if (markdown) { %>\n    <div class='dropdown-menu fr'>\n      <a href='#' class='round dropdown-hover'>Markdown</a>\n      <ul class='dropdown markdown-snippets round'>\n        <li><a href='#' data-snippet='<% print(\"# Heading\\n\\n\") %>'>Main Header</a></li>\n        <li><a href='#' data-snippet='<% print(\"## Sub Heading\\n\\n\") %>'>Sub Header</a></li>\n        <li><a href='#' data-snippet='<% print(\"```\\nvar foo;\\n```\\n\\n\"); %>'>Code</a></li>\n        <li><a href='#' data-snippet='<% print(\"[Google](http://google.com)\\n\\n\") %>'>Link</a></li>\n        <li><a href='#' data-snippet='<% print(\"![picture alt](http://placekitten.com/200/300)\\n\\n\") %>'>Image</a></li>\n        <li><a href='#' data-snippet='<% print(\"> We loved with a love that was more than love\\n\\n\"); %>'>Blockquote</a></li>\n        <li><a href='#' data-snippet='<% print(\"- item\\n- item\\n- item\\n\\n\"); %>'>List</a></li>\n        <li class='divider'></li>\n        <li><a href='http://daringfireball.net/projects/markdown/syntax' target='_blank' target='_blank'><strong>Learn More</strong></a></li>\n      </ul>\n    </div>\n    <% } %>\n  </div>\n</div>\n\n<div class='inner editor views'>\n  <div id='diff' class='view prose diff'></div>\n  <% if (jekyll) { %>\n    <div id='meta' class='view'></div>\n  <% } %>\n  <div id='code' class='view active edit <% if (markdown) { %> markdown<% } %>'></div>\n  <% if (markdown) { %>\n    <div id='preview' class='view preview prose'><%= preview %></div>\n  <% } %>\n</div>\n","posts":"<div class='topbar content-search'>\n  <span class='icon search inline fr'></span>\n  <input type='text' id='filter' placeholder='Filter Files' />\n  <% if (path.length) { %>\n    <div class='breadcrumb'>\n      <a class='branch' href='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'>..</a>\n      <% _.each(_.chunkedPath(path), function(p) { %>\n        <span class='slash'>/</span>\n        <a class='path' href='#<%= [user, repo, \"tree\", branch, p.url].join(\"/\") %>'><%= p.name %></a>\n      <% }); %>\n    </div>\n  <% } %>\n</div>\n\n<ul id='files' class='listing'></ul>\n","profile":"<div class='topbar content-search'>\n  <span class='icon search inline fr'></span>\n  <input type='text' id='filter' placeholder='Filter projects' />\n</div>\n\n<ul id='projects' class='listing'></ul>\n","projects":"<li class='item clearfix'\n    data-navigate='#<%= owner.login %>/<%= name %>'\n    data-index='<%= index %>'>\n\n    <% if (private) { %>\n      <div class='fl icon round repo private'></div>\n    <% } else { %>\n      <div class='fl icon round repo'></div>\n    <% } %>\n\n    <div class='details fl'>\n      <h3><a data-user='<%= owner.login %>' data-repo='<%= name %>' href='#<%= owner.login %>/<%= name %>'><%= name %></a></h3>\n      <br />\n      <span class='deemphasize'><%= description %></span>\n    </div>\n\n    <div class='fr actions clearfix'>\n      <a\n        data-user='<%= owner.login %>'\n        data-repo='<%= name %>'\n        href='#<%= owner.login %>/<%= name %>'>\n        View Project\n      </a>\n      <% if (homepage) { %>\n        <a href='//<%= homepage %>'>View Site</a>\n      <% } %>\n    </div>\n</li>\n","select":"<label for='<%= name %>'><%= label %></label>\n<select name='<%= name %>' data-placeholder='<%= placeholder %>' class='chzn-select'>\n  <% _(options).each(function(o) { %>\n    <% if (o.name) { %>\n     <option value='<%= o.value %>'><%= o.name %></option>\n    <% } else { %>\n     <option value='<%= o.value %>'><%= o.value %></option>\n    <% } %>\n  <% }); %>\n</select>\n","settings":"<% if (window.authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Post Settings</h2>\n  </div>\n  <div class='inner authoring'>\n    <div class='commit'>\n      <textarea class='commit-message' placeholder='Describe your Changes'></textarea>\n      <a class='icon inline small cancel' href='#' title='ESC'>\n        &times;<span class='popup round arrow-right'>Cancel</span>\n      </a>\n    </div>\n\n    <a class='save button round' href='#'>\n      <%= writeable ? 'Save' : 'Submit Change' %>\n      <span class='popup round arrow-right'>⌘&nbsp;+&nbsp;s</span>\n    </a>\n\n    <% if (jekyll && markdown) { %>\n      <a href='#' class='toggle publish button round'>Publish</a>\n    <% } %>\n\n    <% if (app.state.config && app.state.config.languages) { %>\n      <% _(app.state.config.languages).each(function(lang) { %>\n        <% if (lang.value && (metadata.lang && metadata.lang !== lang.value)) { %>\n          <a class='translate round button' href='#<%= lang.value %>'>Translate to <%= lang.name %></a>\n        <% } %>\n      <% }); %>\n    <% } %>\n\n    <a class='delete button round' href='#'>Delete this File</a>\n  </div>\n<% } %>\n","sidebarOrganizations":"<% if (authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Groups</h2>\n  </div>\n  <ul class='listing'>\n  <% if (organizations && organizations.length) { %>\n    <li>\n      <a href='#<%= app.username %>' title='<%= app.username %>'>\n        <span class='icon folder-group inline small'></span>\n        <%= app.username %>\n      </a>\n    </li>\n    <% _.each(organizations, function(org) { %>\n    <li>\n      <a href='#<%= org.login %>' title='<%= org.login %>'>\n        <span class='icon folder-group inline small'></span>\n        <%= org.login %>\n      </a>\n    </li>\n    <% }); %>\n  <% } %>\n  </ul>\n<% } %>\n","sidebarProject":"<div class='inner'>\n  <% if (app.state.branches.length > 0) { %>\n    <h2 class='label'>Switch Branch</h2>\n    <select data-placeholder='Current Branch Name' class='chzn-select'>\n        <option value='#<%= [user, repo, \"tree\", app.state.branch].join(\"/\") %>' selected><%= app.state.branch %></option>\n      <% _.each(app.state.branches, function(branch) { %>\n        <option value='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'><%= branch %></option>\n      <% }); %>\n    </select>\n  <% } %>\n</div>\n","start":"<% if (!authenticated) { %>\n  <div class='round splash'>\n    <h2 class='icon landing'>Prose</h2>\n    <div class='inner'>\n      <p>Prose is a content editor for GitHub designed for managing websites.</p>\n      <p><a href='/about.html'>Learn more</a></p>\n      <a class='round button' href='https://github.com/login/oauth/authorize?client_id=<%= window.app.auth.id %>&scope=repo,user,gist'>Authorize with GitHub</a>\n    </div>\n  </div>\n<% } %>\n","text":"<label for='<%= name %>'><%= label %></label>\n<input type='text' name='<%= name %>' value='<%= value %>' />\n"}; module.exports = templates;