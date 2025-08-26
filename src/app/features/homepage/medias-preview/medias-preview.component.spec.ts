import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasPreviewComponent } from './medias-preview.component';

describe('MediasPreviewComponent', () => {
  let component: MediasPreviewComponent;
  let fixture: ComponentFixture<MediasPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediasPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediasPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
