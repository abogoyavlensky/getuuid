import * as uuid from 'uuid';
import { ulid } from "ulid";
import { nanoid } from 'nanoid'
import Alpine from 'alpinejs'

window.Alpine = Alpine

export default function uuidGenerator() {
  return {
      currentUuid: '',
      selectedType: 'v4',
      copied: false,
      showAbout: false,
      history: [],
      uuidTypes: [
          { id: 'v4', label: 'UUID v4' },
          { id: 'v7', label: 'UUID v7' },
          { id: 'v1', label: 'UUID v1' },
          { id: 'ulid', label: 'ULID' },
          { id: 'nanoid', label: 'Nano ID' }
      ],
      
      init() {
          // Load history from localStorage
          const savedHistory = localStorage.getItem('uuid_history');
          if (savedHistory) {
              this.history = JSON.parse(savedHistory);
          }
          this.generateUuid(); // Generate initial UUID here now
      },
      
      generateUuid() {
          let newUuid = '';

          try { 
              switch(this.selectedType) {
                  case 'v1':
                      newUuid = uuid.v1();
                      break;
                  case 'v4':
                      newUuid = uuid.v4();
                      break;
                  case 'v7':
                      newUuid = uuid.v7();
                      break;
                  case 'ulid':
                      newUuid = ulid(); 
                      break;
                  case 'nanoid':
                      newUuid = nanoid();
                      break;
                  default:
                      newUuid = uuid.v4();
              }
              this.currentUuid = newUuid;
              this.addToHistory(newUuid, this.getTypeLabel());
          } catch (error) {
              console.error("Error generating ID:", error);
              this.currentUuid = "Error generating ID";
          }
      },
      
      selectType(type) {
          this.selectedType = type;
          this.generateUuid();
      },
      
      getTypeLabel() {
          const type = this.uuidTypes.find(t => t.id === this.selectedType);
          return type ? type.label : 'UUID v4';
      },
      
      getTypeDescription() {
          switch(this.selectedType) {
              case 'v1':
                  return 'Time-based UUID that includes the MAC address of the computer that generated it.';
              case 'v4':
                  return 'Random UUID, the most common format. Provides strong uniqueness guarantees.';
              case 'v7':
                  return 'Time-ordered UUID with improved sortability while maintaining randomness.';
              case 'ulid':
                  return 'Universally Unique Lexicographically Sortable Identifier. Time-based and sortable.';
              case 'nanoid':
                  return 'A tiny, URL-friendly, unique string ID generator for JavaScript.';
              default:
                  return 'Random UUID, the most common format. Provides strong uniqueness guarantees.';
          }
      },
      
      copiedItems: {},
      
      copyToClipboard(text, buttonId = 'main') {
          navigator.clipboard.writeText(text).then(() => {
              // Set copied state for specific button
              this.copiedItems[buttonId] = true;
              
              // For backward compatibility with the main button
              if (buttonId === 'main') {
                  this.copied = true;
              }
              
              setTimeout(() => {
                  this.copiedItems[buttonId] = false;
                  
                  if (buttonId === 'main') {
                      this.copied = false;
                  }
              }, 2000);
          });
      },
      
      isButtonCopied(buttonId) {
          return this.copiedItems[buttonId] === true;
      },
      
      addToHistory(uuid, type) {
          // Add to the beginning of the array
          this.history.unshift({ uuid, type });
          
          // Limit history to 50 items
          if (this.history.length > 50) {
              this.history = this.history.slice(0, 50);
          }
          
          // Save to localStorage
          localStorage.setItem('uuid_history', JSON.stringify(this.history));
      },
      
      clearHistory() {
          this.history = [];
          localStorage.removeItem('uuid_history');
      }
  };
}

// Make it accessible outside this file
window.uuidGenerator = uuidGenerator;

Alpine.start()
