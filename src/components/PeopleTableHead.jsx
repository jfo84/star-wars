import React from 'react';
import {
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

const headerData = [
  { id: 'name', label: 'Name', disablePadding: false },
  { id: 'height', label: 'Height', disablePadding: false },
  { id: 'hair_color', label: 'Hair Color', disablePadding: false },
  { id: 'skin_color', label: 'Skin Color', disablePadding: false },
  { id: 'eye_color', label: 'Eye Color', disablePadding: false }
];

const PeopleTableHead = (props) => (
  <TableHead>
    <TableRow>
      {headerData.map(header => {
        return (
          <TableCell
            key={header.id}
            padding={header.disablePadding ? 'none' : 'default'}
          >
            {header.label}
          </TableCell>
        );
      })}
    </TableRow>
  </TableHead>
);

export default PeopleTableHead;