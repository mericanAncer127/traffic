(function(config, models, views, routers, utils, templates) {

views.Start = views.Profile.extend({
  id: 'start',

  className: 'start',

  events: {
    'submit #login_form': '_login'
  },

  render: function() {
    if (window.authenticated) {
        $(this.el).empty().html(templates.start(this.model));
        $('#drawer').empty().html(templates.sidebarOrganizations(this.model));
    } else {
        $('.header').hide();
        $('#main').empty().html(templates.start(this.model));
    }

    return this;
  },

  _login: function() {
    var self = this;

    var user = self.$('#github_user').val();
    var password = self.$('#github_password').val();

    login({username: user, password: password}, function(err) {
      if (err) return self.$('.bad-credentials').show();
      window.location.reload();
    });
    return false;
  }

});

}).apply(this, window.args);
