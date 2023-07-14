import { Component } from 'react';
import css from './ContactItem.module.css';

export class ContactItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li key={item.id} className={css.contactItem}>
        {item.name}: {item.phone}
        <button
          className={css.deleteBtn}
          type="button"
          onClick={() => this.props.deleteItem(item.id)}
        >
          Usuń
        </button>
      </li>
    );
  }
}
