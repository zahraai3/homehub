import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ExpenseCard({
  title = 'Rent',
  totalAmount = '500$',
  share = '100$',
  collected = '200$',
  memberPaid = 'Sarah, Zoey',
  pendingPayMember = 'Mustafa',
  duaDate ='1/1/2005'
}) {


  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
      <Table size="small">
        <TableBody>
            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                {title}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                totalAmount: 
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {totalAmount}$
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                Deadline : 
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {duaDate}
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                My share :
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {share}
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                Collected amount : 
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {collected} $
              </TableCell>
            </TableRow>
            

            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                Paid by : 
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {
                  memberPaid.length > 0
                    ? memberPaid.map((name) => (
                        <p key={name}>{name}</p>
                      ))
                    : 'No one has paid yet.'
                }
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  width: '45%',
                  py: 1.5,
                }}
              >
                Pending : 
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                {
                  pendingPayMember.length > 0
                    ? pendingPayMember.map((name) => (
                        <p key={name}>{name}</p>
                      ))
                    : 'fully paid.'
                }
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}