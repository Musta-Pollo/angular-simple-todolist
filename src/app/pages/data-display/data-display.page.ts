import { Component } from '@angular/core';

import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardIconComponent } from '@/shared/components/icon';
import {
  ZardTableComponent,
  ZardTableHeaderComponent,
  ZardTableBodyComponent,
  ZardTableRowComponent,
  ZardTableHeadComponent,
  ZardTableCellComponent,
  ZardTableCaptionComponent,
} from '@/shared/components/table';
import { ZardCarouselComponent, ZardCarouselItemComponent } from '@/shared/components/carousel';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
}

interface Invoice {
  invoice: string;
  status: string;
  method: string;
  amount: string;
}

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardDividerComponent,
    ZardBadgeComponent,
    ZardAvatarComponent,
    ZardCardComponent,
    ZardIconComponent,
    ZardTableComponent,
    ZardTableHeaderComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent,
    ZardTableHeadComponent,
    ZardTableCellComponent,
    ZardTableCaptionComponent,
    ZardCarouselComponent,
    ZardCarouselItemComponent,
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      <h1 class="text-4xl font-bold mb-8">Data Display Components</h1>

      <!-- TABLE SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Table</h2>
        <z-divider class="mb-6" />

        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Table</h3>
            <div class="rounded-md border">
              <table z-table>
                <thead z-table-header>
                  <tr z-table-row>
                    <th z-table-head>Invoice</th>
                    <th z-table-head>Status</th>
                    <th z-table-head>Method</th>
                    <th z-table-head class="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody z-table-body>
                  @for (invoice of invoices; track invoice.invoice) {
                    <tr z-table-row>
                      <td z-table-cell class="font-medium">{{ invoice.invoice }}</td>
                      <td z-table-cell>{{ invoice.status }}</td>
                      <td z-table-cell>{{ invoice.method }}</td>
                      <td z-table-cell class="text-right">{{ invoice.amount }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Table with Avatars and Badges</h3>
            <div class="rounded-md border">
              <table z-table>
                <thead z-table-header>
                  <tr z-table-row>
                    <th z-table-head>User</th>
                    <th z-table-head>Email</th>
                    <th z-table-head>Role</th>
                    <th z-table-head>Status</th>
                    <th z-table-head class="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody z-table-body>
                  @for (user of users; track user.id) {
                    <tr z-table-row>
                      <td z-table-cell>
                        <div class="flex items-center gap-3">
                          <z-avatar [zSrc]="user.avatar" [zFallback]="user.name.charAt(0)" zSize="sm" />
                          <span class="font-medium">{{ user.name }}</span>
                        </div>
                      </td>
                      <td z-table-cell>{{ user.email }}</td>
                      <td z-table-cell>{{ user.role }}</td>
                      <td z-table-cell>
                        <z-badge
                          [zType]="user.status === 'active' ? 'default' : user.status === 'pending' ? 'secondary' : 'outline'"
                        >
                          {{ user.status }}
                        </z-badge>
                      </td>
                      <td z-table-cell class="text-right">
                        <button z-button zType="ghost" zSize="sm">
                          <z-icon zType="ellipsis" />
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Table with Caption</h3>
            <div class="rounded-md border">
              <table z-table>
                <caption z-table-caption>A list of recent transactions.</caption>
                <thead z-table-header>
                  <tr z-table-row>
                    <th z-table-head>Date</th>
                    <th z-table-head>Description</th>
                    <th z-table-head class="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody z-table-body>
                  <tr z-table-row>
                    <td z-table-cell>2024-01-15</td>
                    <td z-table-cell>Office Supplies</td>
                    <td z-table-cell class="text-right">$125.00</td>
                  </tr>
                  <tr z-table-row>
                    <td z-table-cell>2024-01-14</td>
                    <td z-table-cell>Software License</td>
                    <td z-table-cell class="text-right">$299.00</td>
                  </tr>
                  <tr z-table-row>
                    <td z-table-cell>2024-01-13</td>
                    <td z-table-cell>Travel Expenses</td>
                    <td z-table-cell class="text-right">$450.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Striped Table</h3>
            <div class="rounded-md border">
              <table z-table zType="striped">
                <thead z-table-header>
                  <tr z-table-row>
                    <th z-table-head>#</th>
                    <th z-table-head>Product</th>
                    <th z-table-head>Category</th>
                    <th z-table-head class="text-right">Price</th>
                  </tr>
                </thead>
                <tbody z-table-body>
                  <tr z-table-row>
                    <td z-table-cell>1</td>
                    <td z-table-cell>Laptop Pro</td>
                    <td z-table-cell>Electronics</td>
                    <td z-table-cell class="text-right">$1,299.00</td>
                  </tr>
                  <tr z-table-row>
                    <td z-table-cell>2</td>
                    <td z-table-cell>Wireless Mouse</td>
                    <td z-table-cell>Accessories</td>
                    <td z-table-cell class="text-right">$49.00</td>
                  </tr>
                  <tr z-table-row>
                    <td z-table-cell>3</td>
                    <td z-table-cell>USB-C Hub</td>
                    <td z-table-cell>Accessories</td>
                    <td z-table-cell class="text-right">$79.00</td>
                  </tr>
                  <tr z-table-row>
                    <td z-table-cell>4</td>
                    <td z-table-cell>Monitor 27"</td>
                    <td z-table-cell>Electronics</td>
                    <td z-table-cell class="text-right">$399.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- CAROUSEL SECTION -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Carousel</h2>
        <z-divider class="mb-6" />

        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-medium mb-3">Basic Carousel</h3>
            <z-carousel class="w-full max-w-xl">
              @for (item of carouselItems; track item.id) {
                <z-carousel-item>
                  <div class="p-6 bg-muted rounded-lg flex flex-col items-center justify-center h-64">
                    <z-icon [zType]="item.icon" zSize="xl" class="mb-4" />
                    <h4 class="font-semibold text-lg">{{ item.title }}</h4>
                    <p class="text-muted-foreground text-center">{{ item.description }}</p>
                  </div>
                </z-carousel-item>
              }
            </z-carousel>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-3">Card Carousel</h3>
            <z-carousel class="w-full max-w-4xl">
              @for (card of cardItems; track card.id) {
                <z-carousel-item>
                  <z-card [zTitle]="card.title" [zDescription]="card.description" class="h-full">
                    <div class="flex items-center gap-4">
                      <z-avatar [zFallback]="card.author.charAt(0)" zStatus="online" />
                      <div>
                        <p class="font-medium">{{ card.author }}</p>
                        <p class="text-sm text-muted-foreground">{{ card.date }}</p>
                      </div>
                    </div>
                  </z-card>
                </z-carousel-item>
              }
            </z-carousel>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class DataDisplayPage {
  invoices: Invoice[] = [
    { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
  ];

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', avatar: '' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'pending', avatar: '' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'inactive', avatar: '' },
  ];

  carouselItems = [
    { id: 1, icon: 'sparkles' as const, title: 'Feature 1', description: 'Amazing feature description here' },
    { id: 2, icon: 'zap' as const, title: 'Feature 2', description: 'Lightning fast performance' },
    { id: 3, icon: 'shield' as const, title: 'Feature 3', description: 'Secure and reliable' },
    { id: 4, icon: 'heart' as const, title: 'Feature 4', description: 'Made with love' },
  ];

  cardItems = [
    { id: 1, title: 'Getting Started', description: 'Learn the basics of our platform', author: 'John Doe', date: 'Jan 15, 2024' },
    { id: 2, title: 'Advanced Tips', description: 'Take your skills to the next level', author: 'Jane Smith', date: 'Jan 14, 2024' },
    { id: 3, title: 'Best Practices', description: 'Follow these guidelines for success', author: 'Bob Wilson', date: 'Jan 13, 2024' },
  ];
}
