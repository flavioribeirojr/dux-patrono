import type { Schema, Attribute } from '@strapi/strapi';

export interface FreteFrete extends Schema.Component {
  collectionName: 'components_frete_fretes';
  info: {
    displayName: 'Frete';
    icon: 'cube';
  };
  attributes: {
    Altura_cm: Attribute.Integer & Attribute.Required;
    Largura_cm: Attribute.Integer & Attribute.Required;
    Comprimento_cm: Attribute.Integer & Attribute.Required;
    Peso_kg: Attribute.Decimal;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'frete.frete': FreteFrete;
    }
  }
}
