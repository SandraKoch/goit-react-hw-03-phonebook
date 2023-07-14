import { Component } from 'react';
import { ContactItem } from '../ContactItem';
import css from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    return (
      <div>
        <ul className={css.contactList}>
          {this.props.contactItems
            .filter(item =>
              item.name.toLowerCase().includes(this.props.filter.toLowerCase())
            )
            .map(item => (
              <ContactItem
                item={item}
                deleteItem={id => this.props.deleteItem(id)}
              />
            ))}
        </ul>
      </div>
    );
  }
}
