# Stage name
set :stage, :staging

# Application name
set :application, 'clegane.com'

# Site full url
set :siteurl, 'http://clegane.com'

# Deploy directory
set :deploy_to, "/var/www/#{fetch(:application)}"

set :branch, :master
