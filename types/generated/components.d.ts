import type { Schema, Attribute } from '@strapi/strapi'

export interface SiteCopyInfoCard extends Schema.Component {
  collectionName: 'components_site_copy_info_cards'
  info: {
    displayName: 'InfoCard'
    description: ''
  }
  attributes: {
    Header: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Content: Attribute.Text & Attribute.Required
  }
}

export interface SiteCopyInfoCardLarge extends Schema.Component {
  collectionName: 'components_site_copy_info_card_larges'
  info: {
    displayName: 'InfoCardLarge'
    description: ''
  }
  attributes: {
    Header: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
  }
}

export interface SiteCopyDropdown extends Schema.Component {
  collectionName: 'components_site_copy_dropdowns'
  info: {
    displayName: 'Dropdown'
    description: ''
  }
  attributes: {
    Label: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Placeholder: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    AriaLabel: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
  }
}

export interface PresentationSlide extends Schema.Component {
  collectionName: 'components_presentation_slides'
  info: {
    displayName: 'Slide'
    icon: 'chalkboard-teacher'
    description: ''
  }
  attributes: {
    Title: Attribute.String &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    Content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
    SpeakerNotes: Attribute.RichText &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
  }
}

export interface AboutTheMaterialReference extends Schema.Component {
  collectionName: 'components_acknowledgement_references'
  info: {
    displayName: 'Reference'
    icon: 'hands-helping'
    description: ''
  }
  attributes: {
    Name: Attribute.String & Attribute.Required
    ORCID: Attribute.String
  }
}

export interface AboutTheMaterialPrerequisite extends Schema.Component {
  collectionName: 'components_about_the_material_prerequisites'
  info: {
    displayName: 'Prerequisite'
    icon: 'list-ol'
    description: ''
  }
  attributes: {
    Prerequisite: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
  }
}

export interface AboutTheMaterialLearningOutcomes extends Schema.Component {
  collectionName: 'components_about_the_material_learning_outcomes'
  info: {
    displayName: 'Learning outcome'
    icon: 'brain'
    description: ''
  }
  attributes: {
    LearningOutcome: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        deepl: {
          translate: 'translate'
        }
      }>
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'site-copy.info-card': SiteCopyInfoCard
      'site-copy.info-card-large': SiteCopyInfoCardLarge
      'site-copy.dropdown': SiteCopyDropdown
      'presentation.slide': PresentationSlide
      'about-the-material.reference': AboutTheMaterialReference
      'about-the-material.prerequisite': AboutTheMaterialPrerequisite
      'about-the-material.learning-outcomes': AboutTheMaterialLearningOutcomes
    }
  }
}
