import React, { FC, useCallback } from 'react';
import * as P from './parts';
import { setUserListPage } from '~/src/store/userList/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserListPagination } from '~/src/store/userList/selectors';


const Pagination: FC = () => {
  const dispatch = useDispatch();
  const { currentPage, pageSize, totalItems, totalPages } = useSelector(getUserListPagination);

  const onPageSizeChange = useCallback((page: number) => () => {
    dispatch(setUserListPage(undefined, page));
  }, [dispatch]);
  const onPageChangeNext = useCallback(() => {
    if (currentPage <= totalPages) {
    } dispatch(setUserListPage(currentPage + 1));

  }, [dispatch, currentPage, totalPages]);
  const onPageChangePrevious = useCallback(() => {
    if (currentPage > 1) {
      dispatch(setUserListPage(currentPage - 1));
    }
  }, [dispatch, currentPage]);
  const pageSizes = [10, 20, 30];
  return (
    <P.Wrapper>
      <div>
        <P.InnerWrapper>
          <div>
            Ilość na stronie: {pageSize}
          </div>
          {
            pageSizes.map((size: number) => (
              <P.Button key={size} onClick={onPageSizeChange(size)}>{size}</P.Button>
            ))
          }
        </P.InnerWrapper>
        <P.InnerWrapper>
          <span>
            Ilość na Użytkowników: {totalItems}
          </span>
          <span >
            Ilość stron: {totalPages}
          </span>
        </P.InnerWrapper>
      </div>
      <div>
        <P.InnerWrapper>
          <P.Button onClick={onPageChangePrevious} disabled={currentPage <= 1}>
            Poprzednia
          </P.Button>
          <span>Strona {currentPage}</span>
          <P.Button onClick={onPageChangeNext} disabled={currentPage >= totalPages}>
            Następna
          </P.Button>
        </P.InnerWrapper>
      </div>
    </P.Wrapper>
  )
};

export default Pagination;
