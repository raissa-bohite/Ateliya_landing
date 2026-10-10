export interface LegalListItem {
  title?: string;
  text: string;
}

export interface LegalSubsection {
  title: string;
  list: LegalListItem[];
}

export interface LegalSection {
  number: string;
  title: string;
  content: string | null;
  list?: LegalListItem[];
  highlight?: string;
  footer?: string;
  subsections?: LegalSubsection[];
}
