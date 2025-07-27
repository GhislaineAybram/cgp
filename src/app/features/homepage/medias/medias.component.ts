/**
 * @fileoverview Medias Component - Partner presentation videos
 * @description Component managing the display of video content featuring
 * trusted partners and their expertise in wealth management services
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medias',
  imports: [CommonModule],
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.scss'
})
export class MediasComponent implements OnInit {
  medias: Video[] = [];

  ngOnInit(): void {
    this.medias = [
      {
        id: '1',
        date: new Date('2021-04-22'),
        channel: 'BFM Business',
        title: `Le surplus d’épargne lié à la crise de Covid-19 va-t-il pousser les Français à investir davantage ?`,
        text: `Ce jeudi 22 avril, Philippe Lauzeral, directeur général délégué de Stellium, s'est penché sur les produits d'investissement à privilégier pour les Français qui ont cumulé des montagnes d'épargne en un an, dans l'émission BFM Bourse présentée par Guillaume Sommerer.`,
        link: 'https://www.dailymotion.com/video/x80slvn'
      },
      {
        id: '2',
        date: new Date('2022-12-08'),
        channel: 'BFM Business',
        title: `L'immobilier constitue-t-il encore un rempart contre l'inflation ?`,
        text: `Philippe Lauzeral, directeur général délégué de Stellium`,
        link: 'https://www.youtube.com/watch?v=A8wxZFfOsqQ'
      },
    ];
  }

  getMediaThumbnail(link: string): string {
    if (!link) return '';

    // YouTube (youtu.be or youtube.com)
    const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    // Vimeo
    const vimeoMatch = link.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      const vimeoId = vimeoMatch[1];
      return `https://vumbnail.com/${vimeoId}.jpg`;
    }

    // Dailymotion
    const dailymotionMatch = link.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
    if (dailymotionMatch) {
      return `https://www.dailymotion.com/thumbnail/video/${dailymotionMatch[1]}`;
    }

    // Fallback
    return '/assets/default-video-thumbnail.jpg';
  }

  expandedMediaIds = new Set<string>();

  shouldShowToggle(text: string | null | undefined): boolean {
    return !!text && text.length > 250;
  }

  toggleText(mediaId: string): void {
    this.expandedMediaIds.add(mediaId);
  }

}
