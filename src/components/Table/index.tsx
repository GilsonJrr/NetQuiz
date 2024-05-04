import React, { ReactNode } from "react";
import * as Styled from "./styled";
import { THeader } from "types/index";

type TableProps<GenericProps> = {
  header: THeader[];
  content: GenericProps[];
  renderItem: (item: GenericProps) => ReactNode;
};

const Table = <GenericProps,>({
  header,
  content,
  renderItem,
}: TableProps<GenericProps>) => {
  return (
    <Styled.Table>
      <Styled.TableContent>
        {header.map((titles) => {
          return (
            <Styled.TableHeaderComponents
              width={titles.width || 10}
              align={titles.align}
            >
              {titles.label}
            </Styled.TableHeaderComponents>
          );
        })}
      </Styled.TableContent>
      <Styled.TableBody>
        {content.map((result) => {
          return (
            <Styled.TableBodyContent>
              {renderItem(result)}
            </Styled.TableBodyContent>
          );
        })}
      </Styled.TableBody>
    </Styled.Table>
  );
};

export default Table;
