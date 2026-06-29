import {defineQuery} from 'next-sanity'

export const RATES_QUERY = defineQuery(`{
  "weekday": *[_type == "weekdayRates"][0],
  "weekend": *[_type == "weekendRates"][0],
  "twilight": *[_type == "twilightRates"][0],
  "nonStandard": *[_type == "nonStandardRates"][0]
}`)

export const MEMBERSHIPS_QUERY = defineQuery(`*[_type == "memberships"][0]`)

export const EVENTS_QUERY = defineQuery(`*[_type == "events"] {
  ...,
  flyer {
    asset-> {
      url
    }
  },
  linkDeets {
    linkText,
    linkURL
  }
}`)

export const TICKER_QUERY = defineQuery(`*[_type == "ticker"][0] {
  tickerQuestion,
  tickerArray
}`)

export const NEWS_QUERY = defineQuery(`*[_type == "news"] {
  ...,
  image {
    asset-> {
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  }
}`)

const BLOG_COVER_IMAGE_FRAGMENT = `
  coverImage {
    asset-> {
      url,
      metadata { lqip, dimensions }
    }
  }
`

export const BLOG_POSTS_QUERY = defineQuery(`*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  publishedAt,
  "excerpt": select(body[0]._type == "block" => pt::text(body), body),
  ${BLOG_COVER_IMAGE_FRAGMENT}
}`)

export const BLOG_POSTS_PREVIEW_QUERY = defineQuery(`*[_type == "blog"] | order(publishedAt desc) [0..2] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  "excerpt": select(body[0]._type == "block" => pt::text(body), body),
  ${BLOG_COVER_IMAGE_FRAGMENT}
}`)

export const TEST_BED_QUERY = defineQuery(`*[_type == "testBed"][0] { lexicalContent }`)

export const TEST_BED_2_QUERY = defineQuery(`*[_type == "testBed2"][0] { content }`)

const IMG = `{ asset-> { url } }`

export const INSTRUCTORS_QUERY = defineQuery(`*[_type == "instructors"][0] {
  content,
  sections[] {
    _type, _key,
    col1, col2, col3, col4,
    heading, subheading, subtext, title, description, details,
    image ${IMG}, photo ${IMG},
    buttonLabel, buttonUrl, ctaLabel, ctaUrl, registerLabel, registerUrl,
    style, imagePosition, body, status, lastUpdated,
    value, suffix, label, sessionsCount, price, priceNote,
    overlayLabel, overlayCaption, name, date,
    items[] {
      _key, title, description, iconName,
      quote, name, role, bio, ctaLabel, ctaUrl,
      value, suffix, label,
      photo ${IMG}, image ${IMG}, alt, url,
    },
    logos[] { _key, image ${IMG}, alt, url },
    features[] { _key, text },
    credentials[] { _key, text },
    images[] { _key, image ${IMG}, caption },
  }
}`)

export const BLOG_POST_QUERY = defineQuery(`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  ${BLOG_COVER_IMAGE_FRAGMENT},
  body
}`)