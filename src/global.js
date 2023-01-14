import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-size: 0.8rem;
  }
  .table{
    font-size: 0.65rem;
  }
  td.value0{ background-color: rgb(150,50,50); }
  td.value1{ background-color: rgb(120,60,60) }
  td.value2{ background-color: rgb(70,90,70); }
  td.value3{ background-color: rgb(60,120,60); }
  td.value4{ background-color: rgb(50,150,50); }
  .headerControls{
    width: 20px;
  }
  .table,
  .table-striped>tbody>tr:nth-of-type(odd)>*,
  .table tr:hover td{
    color: ${({ theme }) => theme.text}!important;
  }
  .card {
    background: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.borderColor};
  }
  .card-header {
    border-color: ${({ theme }) => theme.borderColor};
  }
  .nav-link,
  .nav-link:hover {
    color: ${({ theme }) => theme.linkColor};
  }
  .multiSelect{
    color: #363537;
  }
  .tab-content{
    padding-top: 20px;
  }
  `