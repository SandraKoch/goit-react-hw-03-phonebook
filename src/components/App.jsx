import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (newContact, newNumber) => {
    const exists = this.state.contacts.find(
      contact => contact.name === newContact
    );
    if (!exists) {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            name: newContact,
            id: nanoid(),
            phone: newNumber,
          },
        ],
      }));
      Notify.success(`${newContact} has been added to your Phonebook`);
    } else {
      Notify.warning(`${newContact} is already in your Phonebook`);
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => id !== contact.id),
    }));
    const contact = this.state.contacts.find(item => item.id === id);
    Notify.failure(`${contact.name} has been deleted`);
  };

  filterContacts = newFilter => {
    this.setState(() => ({
      filter: newFilter,
    }));
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onAdd={(name, phone) => this.addContact(name, phone)} />

        <h2>Contacts</h2>
        <Filter onFilter={filter => this.filterContacts(filter)} />
        <ContactList
          contactItems={this.state.contacts}
          filter={this.state.filter}
          deleteItem={id => this.deleteContact(id)}
        />
      </div>
    );
  }
}
