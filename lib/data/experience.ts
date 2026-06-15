/** Full work history — sourced from James' resume. */

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  href?: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Okta",
    role: "Technical Account Manager",
    start: "Feb 2025",
    end: "Present",
    location: "San Francisco, CA",
    href: "https://www.okta.com",
    bullets: [
      "Own a $17M+ cARR book of business across 30+ enterprise accounts, driving Auth0 adoption to strengthen customer security posture and achieving a 100% contract renewal rate.",
      "Resolve complex customer-facing technical issues through API debugging, log analysis, and JavaScript/Auth0 configuration — partnering with Engineering and Product to close gaps and accelerate time-to-resolution.",
      "Built AI-powered internal tooling, including MCP servers (Google Workspace, Gainsight) and Slack automation agents, to streamline AE request workflows.",
      "Mentored 2 incoming TAMs and led intern interviews across 2 consecutive hiring cycles, developing internal and customer-facing training content.",
      "Developed SIPP and outbound playbooks for the Scale team and used Looker analytics to surface Attack Protection upsell opportunities for proactive engagement.",
      "Led an Auth0 customer-facing webinar end-to-end — building the session guide, presenting to engineering and executive audiences, and authoring reference docs adopted across the field team.",
    ],
  },
  {
    company: "Okta",
    role: "Technical Account Management Intern",
    start: "May 2024",
    end: "Aug 2024",
    location: "San Francisco, CA",
    href: "https://www.okta.com",
    bullets: [
      "Drove a 27% increase in subscription renewals and a 24% decrease in churn by composing technical strategy documents on feature adoption and best practices for 5+ accounts.",
      "Collaborated cross-functionally with Engineering and Product to author technical strategy documentation.",
      "Shadowed 5 Technical Account Managers covering accounts of $200K+ ARR and a combined market cap of $1.5B+ across Salesforce and Gainsight.",
    ],
  },
  {
    // TODO: confirm dates and location — placeholder for now.
    company: "Cisco",
    role: "Project Management Intern",
    start: "May 2023",
    end: "Aug 2023",
    location: "San Jose, CA",
    href: "https://www.cisco.com",
    bullets: [
      "Delivered a 70% optimization on excess part mitigation processes and workflows by building and shipping an internal automated dashboard & analysis tool to address $750M+ of excess parts; presented a product demo of functionality and impact to executives and stakeholders.",
      "Collaborated cross-functionally with Supply Chain PMs, Product Ops, and Business Units to identify user pain points with current processes, exposing $5M+ in missed mitigation opportunities.",
      "Yielded a 3.2% accuracy increase of demand-forecasting AI by designing a new stream selection strategy with a mean-variance analysis of 300K+ PLIDs, measuring results via A/B testing.",
    ],
  },
  {
    company: "Jabil",
    role: "Project Management Intern",
    start: "Jul 2022",
    end: "Aug 2022",
    location: "Fremont, CA",
    href: "https://www.jabil.com",
    bullets: [
      "Managed development and launch of 3 features of an internal project management tool: employee verification with the Okta Sessions API, a dynamic timeline, and a ticket-issuing system.",
      "Assisted the Software Development Manager by analyzing user feedback to prioritize product features, sprints, and backlog, and built a product roadmap — leading to a 25% improvement in productivity.",
      "Accelerated the transition from a legacy ERP to a new Critical Manufacturing ERP by 33% by ensuring quality data migration of 20,000+ facility assets through data maps, cleansing, and testing.",
    ],
  },
];
