###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

data.bios.each do |bio|
  proxy "/bios/#{bio[0]}/index.html", "/bios/template.html", locals: { bio: bio[1] }, :ignore => true
end

data.shows.each do |show|
  proxy "/shows/#{show[0]}/index.html", "/shows/template.html", locals: { id: show[0], show: show[1] }, :ignore => true
end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
helpers do
  # monkey patch
  require "lib/enumerable"

  def markdown(text)
    Tilt['markdown'].new { text }.render
  end
end
#helpers Enumerable

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  activate :minify_html do |html|
    html.remove_multi_spaces        = true   # Remove multiple spaces
    html.remove_comments            = true   # Remove comments
    html.remove_intertag_spaces     = false  # Remove inter-tag spaces
    html.remove_quotes              = true   # Remove quotes
    html.simple_doctype             = false  # Use simple doctype
    html.remove_script_attributes   = true   # Remove script attributes
    html.remove_style_attributes    = true   # Remove style attributes
    html.remove_link_attributes     = true   # Remove link attributes
    html.remove_form_attributes     = false  # Remove form attributes
    html.remove_input_attributes    = true   # Remove input attributes
    html.remove_javascript_protocol = true   # Remove JS protocol
    html.remove_http_protocol       = false  # Remove HTTP protocol
    html.remove_https_protocol      = false  # Remove HTTPS protocol
    html.preserve_line_breaks       = false  # Preserve line breaks
    html.simple_boolean_attributes  = true   # Use simple boolean attributes
  end

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
   activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :dotenv, env: 'deploy.env'

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.method   = ENV["DEPLOY_METHOD"]
  deploy.host     = ENV["DEPLOY_HOST"]
  deploy.port     = ENV["DEPLOY_PORT"]
  deploy.path     = ENV["DEPLOY_PATH"]
  deploy.user     = ENV["DEPLOY_USER"]
  deploy.password = ENV["DEPLOY_PASSWORD"]
end
