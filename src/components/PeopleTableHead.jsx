import React from 'react';
import {
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';
import styled from 'styled-components';

const headerData = [
  { id: 'name', label: 'Name', disablePadding: false },
  { id: 'height', label: 'Height', disablePadding: false },
  { id: 'hair_color', label: 'Hair Color', disablePadding: false },
  { id: 'skin_color', label: 'Skin Color', disablePadding: false },
  { id: 'eye_color', label: 'Eye Color', disablePadding: false }
];

const StandardCell = styled(TableCell)`
  & {
    min-width: 100px;
  }
`;

const PeopleTableHead = (props) => (
  <TableHead>
    <TableRow>
      {headerData.map(header => (
        <StandardCell
          key={header.id}
          padding={header.disablePadding ? 'none' : 'default'}
        >
          {header.label}
        </StandardCell>
      ))}
    </TableRow>
  </TableHead>
);

export default PeopleTableHead;