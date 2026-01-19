import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent, ZardCardComponent, ZardIconComponent],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Hero Section -->
      <section class="container mx-auto px-4 py-20">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl font-bold tracking-tight mb-6">
            Welcome to Your App
          </h1>
          <p class="text-xl text-muted-foreground mb-8">
            Build something amazing with Angular and Zard UI components.
            Fast, accessible, and beautifully designed.
          </p>
          <div class="flex gap-4 justify-center">
            <button z-button zSize="lg">
              Get Started
            </button>
            <a routerLink="/dev" z-button zType="outline" zSize="lg">
              <z-icon zType="code" class="mr-2" />
              View Components
            </a>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <z-card>
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <z-icon zType="zap" class="text-primary" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
              <p class="text-muted-foreground">
                Built with Angular's latest features for optimal performance and lazy loading.
              </p>
            </div>
          </z-card>

          <z-card>
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <z-icon zType="palette" class="text-primary" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Beautiful Design</h3>
              <p class="text-muted-foreground">
                Clean, modern UI components with dark mode support and customizable themes.
              </p>
            </div>
          </z-card>

          <z-card>
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <z-icon zType="shield" class="text-primary" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Accessible</h3>
              <p class="text-muted-foreground">
                All components follow WAI-ARIA guidelines for maximum accessibility.
              </p>
            </div>
          </z-card>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="container mx-auto px-4 py-16">
        <div class="bg-muted rounded-2xl p-12 text-center">
          <h2 class="text-3xl font-bold mb-4">Ready to build?</h2>
          <p class="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start creating your application with our comprehensive component library.
          </p>
          <button z-button zSize="lg">
            Start Building
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t">
        <div class="container mx-auto px-4 py-8">
          <div class="flex justify-between items-center">
            <p class="text-sm text-muted-foreground">
              © 2024 Your App. All rights reserved.
            </p>
            <a
              routerLink="/dev"
              class="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dev Components →
            </a>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class HomePage {}
