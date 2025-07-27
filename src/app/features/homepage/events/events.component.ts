/**
 * @fileoverview Events Component - Thematic events and conferences
 * @description Component managing the display of upcoming thematic evenings
 * and conferences organized by the Financial Advisor
 * 
 * @copyright Copyright (c) 2025 Julien Poudras. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { Evening } from '../../../models/evening';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  evenings: Evening[] = [];

  ngOnInit(): void {
    this.evenings = [
      {
        id: '1',
        title: `Concrétiser ses projets de vie grâce à l'argent de ses impôts`,
        location: 'zoom',
        date: new Date('2024-05-16'),
        hour: '19:30',
        picture: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '2',
        title: `Les SCPI, la solution d'investissement pour répondre à tous vos objectifs patrimoniaux`,
        location: 'zoom',
        date: new Date('2024-06-27'),
        hour: '19:00',
        picture: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '3',
        title: `Comprendre la fiscalité et appréhender les leviers permettant d'agir sur la pression fiscale`,
        location: 'Paris La Défense',
        date: new Date('2024-03-13'),
        hour: '19:00',
        picture: 'https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ];

      // Vérifiez que les dates sont valides
  this.evenings.forEach(evening => {
    if (!(evening.date instanceof Date) || isNaN(evening.date.getTime())) {
      console.error('Date invalide :', evening.date);
    }
  });
  }
}
