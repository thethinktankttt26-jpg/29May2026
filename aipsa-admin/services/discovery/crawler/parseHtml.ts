import * as cheerio from "cheerio";

export interface ParsedDiscovery {

  title: string;

  links: string[];

}

export function parseHtml(html: string): ParsedDiscovery {

  const $ = cheerio.load(html);

  const title = $("title").text().trim();

  const links: string[] = [];

  $("a").each((_, element) => {

    const href = $(element).attr("href");

    if (!href) return;

    links.push(href);

  });

  return {

    title,

    links: [...new Set(links)],

  };

}