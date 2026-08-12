const root = document.querySelector<HTMLElement>("[data-work-index]");

if (root) {
  const filters = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-work-filter]"));
  const search = root.querySelector<HTMLInputElement>("[data-work-search]");
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-work-item]"));
  const count = root.querySelector<HTMLElement>("[data-work-count]");
  const empty = root.querySelector<HTMLElement>("[data-work-empty]");
  const emptyTitle = root.querySelector<HTMLElement>("[data-work-empty-title]");
  const emptyCopy = root.querySelector<HTMLElement>("[data-work-empty-copy]");
  let activeFilter = "all";

  const updateUrl = () => {
    const url = new URL(window.location.href);
    activeFilter === "all" ? url.searchParams.delete("filter") : url.searchParams.set("filter", activeFilter);
    search?.value.trim()
      ? url.searchParams.set("q", search.value.trim())
      : url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  };

  const render = () => {
    const query = search?.value.trim().toLowerCase() ?? "";
    let visibleCount = 0;
    const visibleItems: HTMLElement[] = [];

    items.forEach((item) => {
      const categories = item.dataset.workCategories?.split(" ") ?? [];
      const filterMatches = activeFilter === "all" || categories.includes(activeFilter);
      const searchMatches = !query || item.dataset.workSearchText?.includes(query);
      const visible = filterMatches && Boolean(searchMatches);
      item.hidden = !visible;
      item.classList.remove("is-last-visible");
      if (visible) visibleItems.push(item);
      visibleCount += Number(visible);
    });

    visibleItems.at(-1)?.classList.add("is-last-visible");

    if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "result" : "results"}`;

    if (empty && emptyTitle && emptyCopy) {
      empty.hidden = visibleCount !== 0;
      emptyTitle.textContent = "No matching work.";
      emptyCopy.textContent = "Try another filter or search term.";
    }

    filters.forEach((filter) => {
      const selected = filter.dataset.workFilter === activeFilter;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });

    updateUrl();
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      activeFilter = filter.dataset.workFilter ?? "all";
      render();
    });
  });

  search?.addEventListener("input", render);

  const params = new URLSearchParams(window.location.search);
  const requestedFilter = params.get("filter");
  const validFilter = filters.some((filter) => filter.dataset.workFilter === requestedFilter);
  activeFilter = validFilter && requestedFilter ? requestedFilter : "all";
  if (search) search.value = params.get("q") ?? "";
  render();
}
