/* =========================================================
   VIMAL TECH - LATEST BLOG POSTS
   Blogger JSONP Integration
   ========================================================= */

const blogSources = [
  {
    container: "technical-journeys-posts",
    feed: "https://blog.vimaltech.dev/feeds/posts/default",
    limit: 3
  },
  {
    container: "system-design-posts",
    feed: "https://sd.vimaltech.dev/feeds/posts/default",
    limit: 3
  },
  {
    container: "dsa-posts",
    feed: "https://dsa.vimaltech.dev/feeds/posts/default",
    limit: 3
  }
];


/* =========================================================
   LOAD BLOGGER FEED USING JSONP
   ========================================================= */

function loadBlogPosts(blog) {

  const callbackName =
    `bloggerCallback_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

  const container =
    document.getElementById(blog.container);

  if (!container) {
    return;
  }


  /* -----------------------------------------
     Global JSONP callback
     ----------------------------------------- */

  window[callbackName] = function (data) {

    try {

      const entries =
        data?.feed?.entry || [];

      if (!entries.length) {

        container.innerHTML = `
          <div class="blog-error">
            No posts available.
          </div>
        `;

        return;
      }


      /* -----------------------------------------
         Clear loading message
         ----------------------------------------- */

      container.innerHTML = "";


      /* -----------------------------------------
         Render latest posts
         ----------------------------------------- */

      entries
        .slice(0, blog.limit)
        .forEach(entry => {

          const title =
            entry.title?.$t || "Untitled Post";

          const url =
            getPostUrl(entry);

          const published =
            entry.published?.$t || "";

          const formattedDate =
            formatBlogDate(published);


          const postElement =
            document.createElement("article");

          postElement.className =
            "blog-post";


          postElement.innerHTML = `
            <a
              href="${escapeHtmlAttribute(url)}"
              target="_blank"
              rel="noopener noreferrer"
            >

              <h4 class="blog-post-title">
                ${escapeHtml(title)}
              </h4>

              <span class="blog-post-date">
                ${escapeHtml(formattedDate)}
              </span>

            </a>
          `;


          container.appendChild(postElement);

        });


    } catch (error) {

      console.error(
        `Error processing Blogger feed:`,
        error
      );

      showBlogError(container);

    }


    /* -----------------------------------------
       Cleanup callback
       ----------------------------------------- */

    delete window[callbackName];

    if (scriptElement.parentNode) {
      scriptElement.parentNode.removeChild(scriptElement);
    }

  };


  /* -----------------------------------------
     Create JSONP script
     ----------------------------------------- */

  const scriptElement =
    document.createElement("script");


  scriptElement.src =
    `${blog.feed}` +
    `?alt=json-in-script` +
    `&max-results=${blog.limit}` +
    `&callback=${callbackName}`;


  scriptElement.async = true;


  /* -----------------------------------------
     Handle network/script errors
     ----------------------------------------- */

  scriptElement.onerror = function () {

    console.error(
      `Unable to load Blogger feed: ${blog.feed}`
    );

    showBlogError(container);


    delete window[callbackName];

    if (scriptElement.parentNode) {
      scriptElement.parentNode.removeChild(scriptElement);
    }

  };


  document.head.appendChild(scriptElement);
}


/* =========================================================
   GET BLOG POST URL
   ========================================================= */

function getPostUrl(entry) {

  const alternateLink =
    entry.link?.find(
      link => link.rel === "alternate"
    );

  return alternateLink?.href || "#";
}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatBlogDate(dateString) {

  if (!dateString) {
    return "";
  }

  const date =
    new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );
}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;
}


/* =========================================================
   HTML ATTRIBUTE ESCAPE
   ========================================================= */

function escapeHtmlAttribute(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


/* =========================================================
   ERROR MESSAGE
   ========================================================= */

function showBlogError(container) {

  container.innerHTML = `
    <div class="blog-error">
      Unable to load posts right now.
    </div>
  `;

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    blogSources.forEach(
      blog => loadBlogPosts(blog)
    );

  }
);