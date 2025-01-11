import { AUTOMATION_LISTENERS, AUTOMATION_LISTENERS_PROPS, AUTOMATION_TRIGGER_PROPS, AUTOMATION_TRIGGERS } from "./automation";
import { PAGE_BREADCRUMBS, PAGE_BREADCRUMBS_PROPS } from "./bread-crumbs";
import {
  INTEGRATION_PLATFORMS,
  INTEGRATION_PLATFORMS_PROPS,
} from "./integrations-platforms";
import { PAGE_ICON, PAGE_ICON_PROPS } from "./page-icon";
import { PRICING_PLANS, PRICING_PLANS_PROPS } from "./pricing-plan";
import { SIDEBAR_ITEMS, SIDEBAR_ITEMS_PROPS } from "./sidebar";

type VeronicaConstants = {
  sidebarItems: SIDEBAR_ITEMS_PROPS[];
  pageBreadcrumbs: PAGE_BREADCRUMBS_PROPS[];
  pageIcon: PAGE_ICON_PROPS;
  pricingPlans: PRICING_PLANS_PROPS[];
  integrationPlatforms: INTEGRATION_PLATFORMS_PROPS[];
  automationListeners: AUTOMATION_LISTENERS_PROPS[];
  automationTriggers: AUTOMATION_TRIGGER_PROPS[];
};

export const VERONICA_CONSTANTS: VeronicaConstants = {
  sidebarItems: SIDEBAR_ITEMS,
  pageBreadcrumbs: PAGE_BREADCRUMBS,
  pageIcon: PAGE_ICON,
  pricingPlans: PRICING_PLANS,
  integrationPlatforms: INTEGRATION_PLATFORMS,
  automationListeners: AUTOMATION_LISTENERS,
  automationTriggers: AUTOMATION_TRIGGERS,
};
