require 'bibtex'

module Jekyll
  # Share the same citation data with publication buttons and the PDF CV.
  class PublicationBibtexGenerator < Generator
    safe true

    def generate(site)
      bibliography = BibTeX.open(site.in_source_dir('_bibliography', 'papers.bib'))
      hidden_fields = site.config.fetch('filtered_bibtex_keywords', []).map(&:to_sym)

      bibliography.entries.each_value do |entry|
        next unless entry[:bibtex_show].to_s == 'true'

        citation = entry.dup
        hidden_fields.each { |field| citation.fields.delete(field) }
        if entry[:arxiv]
          citation[:eprint] = entry[:arxiv].to_s
          citation[:archiveprefix] = 'arXiv'
        end

        # A text source avoids Jekyll Scholar's .bib-to-HTML converter.
        page = PageWithoutAFile.new(site, site.source, 'assets/bibliography/publications', "#{entry.key}.txt")
        page.content = citation.to_s + "\n"
        page.data['permalink'] = "/assets/bibliography/publications/#{entry.key}.bib"
        page.data['layout'] = nil
        page.data['sitemap'] = false
        site.pages << page
      end
    end
  end
end
