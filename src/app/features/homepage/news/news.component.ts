/**
 * @fileoverview News Component - News and legal updates
 * @description Component managing the display of articles about legal changes,
 * tax updates and financial news that may impact client finances
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component } from '@angular/core';
import { Article } from '../../../models/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  articles: Article[] = [];

  ngOnInit(): void {
    this.articles = [
      {
        id: '1',
        theme: 'SCPI',
        date: new Date('2024-05-16'),
        title: `Lorem ipsum dolor sit amet`,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis quam nec diam efficitur porta et sit amet turpis. Vivamus orci dolor, lobortis non mollis ut, volutpat vel odio. Aliquam erat volutpat. Nam eu condimentum velit. Nulla justo turpis, auctor a ornare in, ornare nec nisi. Vestibulum vel dui varius, laoreet lacus sed, tempus ante.'
      },
      {
        id: '2',
        theme: 'PER',
        date: new Date('2024-03-11'),
        title: `Ut libero mauris, varius eget ipsum at, malesuada aliquam ligula`,
        text: 'Ut libero mauris, varius eget ipsum at, malesuada aliquam ligula. Morbi ultricies neque sit amet nisl laoreet, varius interdum dolor venenatis. Nam enim dui, placerat quis tristique id, laoreet eget sapien. Integer a nunc in urna viverra euismod. Sed cursus maximus ante, a malesuada urna consectetur et.'
      },
      {
        id: '3',
        theme: 'Impôts',
        date: new Date('2024-01-01'),
        title: `Praesent nec ligula ut sapien sagittis sodales`,
        text: 'Praesent nec ligula ut sapien sagittis sodales. Mauris tincidunt bibendum efficitur. Curabitur magna eros, bibendum hendrerit neque sit amet, porttitor pulvinar ex. Phasellus interdum faucibus quam nec placerat.'
      },
    ]
  }
}
