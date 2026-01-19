import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Header -->
      <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center">
          <div class="mr-4 flex">
            <a routerLink="/dev" class="mr-6 flex items-center space-x-2">
              <span class="font-bold text-xl">Zard UI</span>
              <span class="text-xs bg-muted px-2 py-0.5 rounded">Dev</span>
            </a>
          </div>
          <nav class="flex items-center gap-6 text-sm">
            <a
              routerLink="/dev/components"
              routerLinkActive="text-foreground"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Basic
            </a>
            <a
              routerLink="/dev/form-components"
              routerLinkActive="text-foreground"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Form
            </a>
            <a
              routerLink="/dev/overlay-components"
              routerLinkActive="text-foreground"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Overlays
            </a>
            <a
              routerLink="/dev/navigation-components"
              routerLinkActive="text-foreground"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Navigation
            </a>
            <a
              routerLink="/dev/data-display"
              routerLinkActive="text-foreground"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Data Display
            </a>
            <a
              routerLink="/dev/controls"
              routerLinkActive="text-foreground"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Controls
            </a>
            <span class="text-border">|</span>
            <a
              routerLink="/dev/app-elements"
              routerLinkActive="text-foreground"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              App Elements
            </a>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <router-outlet />
      </main>
    </div>
  `,
})
export class ShellComponent {}
