import { PAGE_BREADCRUMBS, PAGE_BREADCRUMBS_PROPS } from "./bread-crumbs";
import { SIDEBAR_ITEMS, SIDEBAR_ITEMS_PROPS } from "./sidebar";

type VeronicaConstants = {
  sidebarItems: SIDEBAR_ITEMS_PROPS[];
  pageBreadcrumbs: PAGE_BREADCRUMBS_PROPS[];
};

export const VERONICA_CONSTANTS: VeronicaConstants = {
  sidebarItems: SIDEBAR_ITEMS,
  pageBreadcrumbs: PAGE_BREADCRUMBS
};
