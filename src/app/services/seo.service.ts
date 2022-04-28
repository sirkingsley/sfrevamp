//import { element } from 'protractor';
import { ISiteMetaData } from './../interfaces/site-meta-data.interface';
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private title: Title, private meta: Meta) { }
  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
  }
  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }
  /**
   * Update SEO meta data
   * @param metaData meta data object
   */
  updateMetaData(metaData: ISiteMetaData) {
    this.meta.addTags([
      {name: '', content: ''}
    ]);
    this.meta.addTag({ name: 'title', content: metaData.title });
    this.meta.addTag({ name: 'description', content: metaData.description });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:title', content: metaData.title });
    this.meta.addTag({ property: 'og:description', content: metaData.description });
    this.meta.addTag({ property: 'og:url', content: metaData.url });
    this.meta.addTag({ property: 'og:image', content: metaData.image_url });

    this.meta.addTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ property: 'twitter:title', content: metaData.title });
    this.meta.addTag({ property: 'twitter:description', content: metaData.description });
    this.meta.addTag({ property: 'twitter:url', content: metaData.url });
    this.meta.addTag({ property: 'twitter:image', content: metaData.image_url });
  }
}
