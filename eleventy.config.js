const TZ = "Asia/Kolkata";

function fmt(date, opts) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: TZ, ...opts }).format(new Date(date));
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // All stories, newest first
  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );

  // Dates
  eleventyConfig.addFilter("longDate", (d) =>
    fmt(d, { day: "numeric", month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("shortDate", (d) =>
    fmt(d, { day: "numeric", month: "short", year: "numeric" })
  );
  eleventyConfig.addFilter("dateTime", (d) =>
    fmt(d, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("weekday", (d) => fmt(d, { weekday: "long" }));

  // Collection helpers
  eleventyConfig.addFilter("byCategory", (items, cat) =>
    (items || []).filter((i) => i.data.category === cat)
  );
  eleventyConfig.addFilter("exclude", (items, page) =>
    (items || []).filter((i) => i.url !== (page && page.url))
  );
  eleventyConfig.addFilter("leadStory", (items) =>
    (items || []).find((i) => i.data.lead) || (items || [])[0]
  );
  eleventyConfig.addFilter("breakingNews", (items) => {
    const b = (items || []).filter((i) => i.data.breaking);
    return (b.length ? b : items || []).slice(0, 4);
  });
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("offset", (arr, n) => (arr || []).slice(n));
  eleventyConfig.addFilter("absUrl", (path, base) => {
    try { return new URL(path, base).href; } catch { return path; }
  });
  eleventyConfig.addFilter("stripHtml", (s) =>
    String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  );
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  eleventyConfig.addGlobalData("build", { now: new Date() });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
