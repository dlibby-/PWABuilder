import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getCards } from './community-hub-cards';
import '../components/community-card';

@customElement('community-hub')
export class CommunityHub extends LitElement {
  @state() cards: any = [];

  static get styles() {
    return [
    css`
      #community-panel {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        background: white;
        padding: 2em;
        column-gap: 1em;
      }

      #community-photo {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

      #community-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }

      #community-content h2 {
        color: black;
        margin: 0;
        margin-bottom: 1em;
        font-weight: bold;
        font-size: 1.55em;
      }

      #community-cards {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    `,
    ];
  }

  constructor() {
    super();
  }

  firstUpdated(){
    this.cards = getCards();
  }

  render() {
    return html`
      <div id="community-panel">
        <div id="community-photo">
          <img src="/assets/new/community-image.png" />
        </div>
        <div id="community-content">
          <h2>Join our Community</h2>
          <div id="community-cards">
            ${this.cards.map((card: any) => html`
              <community-card
              cardTitle=${card.title}
              description=${card.description}
              imageUrl=${card.imageUrl}
              .links=${card.links}
            >
            </community-card>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}