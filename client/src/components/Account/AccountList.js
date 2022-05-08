import React from 'react';
import Modal from '../common/Modal';
import AccountEditor from './AccountEditor';
import AccountPieChart from './AccountPieChart';
import AccountWriteUp from './AccountWriteUp';
import dummydata from './dummydata';

function AccountList({ AccountList, onEdit, onRemove, onCreate }) {
  const a = new Date().toLocaleString();
  return (
    <div className="AccountList">
      <div className="AccountListSpanBox">
        <h4>{AccountList.length}개의 기록이 있어요 !</h4>
        <Modal>
          <AccountWriteUp onCreate={onCreate} />
        </Modal>
        <Modal>
          <AccountPieChart data={dummydata} />
        </Modal>
      </div>
      <div>
        {AccountList.map(it => (
          <AccountEditor
            key={it.id}
            {...it}
            onEdit={onEdit}
            onRemove={onRemove}
            onCreate={onCreate}
            AccountList={AccountList}
          />
        ))}
      </div>
    </div>
  );
}

AccountList.defaultProps = {
  AccountList: ['에러발생 !'],
};

export default AccountList;
