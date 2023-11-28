import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devportfolio';
  lastScrollTop: number = 0;

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = this.el.nativeElement.querySelector('nav');
        const navLine = this.el.nativeElement.querySelector('.nav-line');

        if (currentScroll > this.lastScrollTop) {
            this.renderer.setStyle(navbar, 'top', '-60px'); 
            this.renderer.addClass(navLine, 'full-width-line'); 
        } else {
            this.renderer.setStyle(navbar, 'top', '0');
            if (currentScroll === 0) {
                this.renderer.removeClass(navLine, 'full-width-line');
            }
        }
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
}
