import styled from "styled-components";
import { DefaultTheme } from "styled-components";

interface RowProps {
        theme:DefaultTheme
}

const Row =styled.div<RowProps>`
   display:flex;
   flex-direction:roe;
   align-items:center;
   justifiy-context:center;
   max-width:80rem;
   padding:20px;
   margin:0 auto;

`;

export default Row;