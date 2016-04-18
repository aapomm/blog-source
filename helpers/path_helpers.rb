module PathHelpers
  def page_title
    current_page.url.split(%r{[\/\.]})[4]
  end
end
