# config valid only for Capistrano 3.1
lock '3.2.1'

set :user, 'root'
set :host, '37.139.9.168'
set :home, '/root'
set :configfile, 'application.php'

role :app, %w{root@37.139.9.168}
role :web, %w{root@37.139.9.168}
role :db,  %w{root@37.139.9.168}

server '37.139.9.168'
set :tmp_dir, "/root/tmp"

set :repo_url, 'git@github.com:Yago/clegane.git'

set :deploy_via, :remote_cache
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules"]
set :scm, :git
set :use_sudo, false
set :log_level, :info

set :keep_releases, 5

require 'json'
buildLocation = JSON.parse(File.read('gulp_config.json'))['build']
buildLocation.slice! "build/"
namespace :build do
  task :send do
    system "scp -r #{buildLocation}build #{fetch(:user)}@#{fetch(:host)}:#{current_path}/#{buildLocation}"
  end
end
after "deploy", "build:send"
