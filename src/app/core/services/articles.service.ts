import { Injectable } from '@angular/core';
import { Article } from '../../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articles: Article[] = [
    { 
      id: '1',
      theme: 'SCPI',
      date: new Date('2024-05-16'),
      title: `Lorem ipsum dolor sit amet`,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis quam nec diam efficitur porta et sit amet turpis. Vivamus orci dolor, lobortis non mollis ut, volutpat vel odio. Aliquam erat volutpat. Nam eu condimentum velit. Nulla justo turpis, auctor a ornare in, ornare nec nisi. Vestibulum vel dui varius, laoreet lacus sed, tempus ante.',
      source: 'Le Monde', 
      link: '#' 
    },
    { 
      id: '2',
      theme: 'PER',
      date: new Date('2024-03-11'),
      title: `Ut libero mauris, varius eget ipsum at, malesuada aliquam ligula`,
      text: 'Ut libero mauris, varius eget ipsum at, malesuada aliquam ligula. Morbi ultricies neque sit amet nisl laoreet, varius interdum dolor venenatis. Nam enim dui, placerat quis tristique id, laoreet eget sapien. Integer a nunc in urna viverra euismod. Sed cursus maximus ante, a malesuada urna consectetur et.',
      source: 'Service-public.fr', 
      link: '#' 
    },
    { 
      id: '3',
      theme: 'Impôts',
      date: new Date('2024-01-01'),
      title: `Praesent nec ligula ut sapien sagittis sodales`,
      text: 'Praesent nec ligula ut sapien sagittis sodales. Mauris tincidunt bibendum efficitur. Curabitur magna eros, bibendum hendrerit neque sit amet, porttitor pulvinar ex. Phasellus interdum faucibus quam nec placerat.',
      source: 'Service-public.fr', 
      link: '#' 
    },
    { 
      id: '4',
      theme: 'Retraite',
      date: new Date('2024-03-02'),
      title: `Pellentesque euismod nisi ex`,
      text: 'Pellentesque euismod nisi ex, nec laoreet mi luctus sit amet. Vestibulum facilisis dapibus ex, sit amet convallis neque fermentum eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris accumsan volutpat massa, vel rutrum lorem venenatis sit amet.',
      source: 'Le Figaro', 
      link: '#' 
    },
  ];

  constructor() {}

  getAllArticles(): Article[] {
    return this.articles;
  }

  getFirstArticles(limit: number): Article[] {
    return this.articles.slice(0, limit);
  }
}
