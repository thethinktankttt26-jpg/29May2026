export interface RepresentativeSelectionCandidate {

  url: string;

  category: string;

}

export interface RepresentativeSelectionRequest {

  retailerId: string;

  candidates: RepresentativeSelectionCandidate[];

}