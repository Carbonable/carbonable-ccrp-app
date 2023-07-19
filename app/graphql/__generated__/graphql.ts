/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type CarbonCredit = {
  __typename?: 'CarbonCredit';
  id: Scalars['ID']['output'];
  isLocked: Scalars['Boolean']['output'];
  isRetired: Scalars['Boolean']['output'];
  number?: Maybe<Scalars['String']['output']>;
  origin: CarbonCreditOrigin;
  project?: Maybe<Project>;
  type: CarbonCreditType;
  vintage?: Maybe<Scalars['String']['output']>;
};

export enum CarbonCreditOrigin {
  DirectPurchase = 'DIRECT_PURCHASE',
  ForwardFinance = 'FORWARD_FINANCE'
}

export enum CarbonCreditType {
  Concervation = 'CONCERVATION',
  Restoration = 'RESTORATION'
}

export type Certifier = {
  __typename?: 'Certifier';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Project>>;
  slug: Scalars['String']['output'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Developper = {
  __typename?: 'Developper';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Project>>;
  slug: Scalars['String']['output'];
};

export type GlobalData = {
  __typename?: 'GlobalData';
  forecasted_cc: Scalars['String']['output'];
  generated_cc: Scalars['String']['output'];
  retired_cc: Scalars['String']['output'];
  total_invested: Scalars['String']['output'];
};

export type ImpactMetrics = {
  __typename?: 'ImpactMetrics';
  protected_forest: Scalars['String']['output'];
  protected_species: Scalars['String']['output'];
  removed_tons: Scalars['String']['output'];
  sdgs: Array<Sdg>;
};

export type Map = {
  __typename?: 'Map';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum OffsetType {
  ExAnte = 'EX_ANTE',
  ExPost = 'EX_POST'
}

export type Pagination = {
  count?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Project = {
  __typename?: 'Project';
  area?: Maybe<Scalars['Int']['output']>;
  carbon_credits?: Maybe<Array<CarbonCredit>>;
  certifier: Certifier;
  country?: Maybe<Country>;
  description?: Maybe<Scalars['String']['output']>;
  developper?: Maybe<Developper>;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  localization?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<CarbonCreditOrigin>;
  startDate?: Maybe<Scalars['String']['output']>;
  type?: Maybe<CarbonCreditType>;
};

export type ProjectColorRepartition = {
  __typename?: 'ProjectColorRepartition';
  blue: Map;
  green: Map;
  orange: Map;
};

export type ProjectFundingAllocation = {
  __typename?: 'ProjectFundingAllocation';
  allocation: Scalars['String']['output'];
  comitted_cc: Scalars['String']['output'];
  forwarded_cc: Scalars['String']['output'];
  generated_cc: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  retired_cc: Scalars['String']['output'];
};

export type ProjectMetrics = {
  __typename?: 'ProjectMetrics';
  colors: ProjectColorRepartition;
  localization: Array<Map>;
  standards: Array<Map>;
  types: ProjectTypeRepartition;
};

export enum ProjectType {
  Arr = 'ARR',
  ReddPlus = 'REDD_PLUS'
}

export type ProjectTypeRepartition = {
  __typename?: 'ProjectTypeRepartition';
  avoidance: Scalars['String']['output'];
  removal: Scalars['String']['output'];
};

export type ProjectedDecarbonation = {
  __typename?: 'ProjectedDecarbonation';
  delta?: Maybe<Scalars['String']['output']>;
  emissions: Scalars['String']['output'];
  forward_cc: Scalars['String']['output'];
  purchased_cc: Scalars['String']['output'];
  received_cc: Scalars['String']['output'];
  retired_cc: Scalars['String']['output'];
  target: Scalars['String']['output'];
  year: Scalars['String']['output'];
};

export enum ProjectedDecarbonationViewType {
  InvestmentType = 'INVESTMENT_TYPE',
  OffsetType = 'OFFSET_TYPE',
  ProjectType = 'PROJECT_TYPE'
}

export type Query = {
  __typename?: 'Query';
  certifierBy?: Maybe<Certifier>;
  countries?: Maybe<Array<Maybe<Country>>>;
  countryBy?: Maybe<Country>;
  getGlobalData?: Maybe<GlobalData>;
  getImpactMetrics: ImpactMetrics;
  getProjectFundingAllocation?: Maybe<Array<Maybe<ProjectFundingAllocation>>>;
  getProjectMetrics: ProjectMetrics;
  getProjectedDecarbonation?: Maybe<Array<Maybe<ProjectedDecarbonation>>>;
  getProjectedDecarbonationTable?: Maybe<Array<Maybe<ProjectedDecarbonation>>>;
  projectBy?: Maybe<Project>;
};


export type QueryCertifierByArgs = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type QueryCountryByArgs = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type QueryGetProjectFundingAllocationArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGetProjectedDecarbonationArgs = {
  viewType?: InputMaybe<ProjectedDecarbonationViewType>;
};


export type QueryGetProjectedDecarbonationTableArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProjectByArgs = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Sdg = {
  __typename?: 'Sdg';
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
};
