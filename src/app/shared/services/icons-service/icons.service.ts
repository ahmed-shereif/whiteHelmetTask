import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  private icons: Array<{ name: string; path: string }> = [];

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  // Function to register multiple icons
  registerIcons(icons: Array<{ name: string; path: string }>): void {
    icons.forEach(icon => {
      if (!this.icons.some(i => i.name === icon.name)) {
        this.icons.push(icon);
        this.matIconRegistry.addSvgIcon(
          icon.name,
          this.sanitizer.bypassSecurityTrustResourceUrl(icon.path)
        );
      }
    });
  }


}