export interface DiscoveredProduct {

  url: string;

  category: string;

  title: string;

  imageUrl: string | null;

  inStock: boolean;

}

export interface RepresentativeProduct
  extends DiscoveredProduct {

  score: number;

}

export interface RepresentativeProductSet {

  retailerId: string;

  category: string;

  products:
    RepresentativeProduct[];

}