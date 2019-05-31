const { Router } = require('express');

const { authenticatedUser } = require('../user/helper');
const MemberTable = require('../../member/table');

const router = Router();

router.get('/', (req, res, next) => {
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getAllMemberIdentification()
        .then(member => res.json(member))
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberIdentificationById({ id })
        .then(() => res.json())
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.post('/create', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    avatar,
    memberTier,
    legacyAnokoMember,
    legacyAnokoCommunity
  } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberIdentificationByEmail({ email })
        .then(member => {
          if (member)
            res.status(404).send({ message: 'Member email already exists...' });
        })
        .catch(error => next(error));
      MemberTable.createMemberIdentification({
        firstName,
        lastName,
        email,
        phone,
        avatar,
        memberTier,
        legacyAnokoMember,
        legacyAnokoCommunity
      })
        .then(() =>
          res.status(201).send({ message: 'Member ID successufully created' })
        )
        .catch(error => next(error));
    })

    .catch(error => next(error));
});

router.put('/update/:id', (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    avatar,
    memberTier,
    legacyAnokoMember,
    legacyAnokoCommunity
  } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberIdentificationById({ id })
        .then(member => {
          if (member === undefined) {
            res.status(404).send({ message: 'Member does not exist...' });
          }
        })
        .catch(error => next(error));
      MemberTable.updateMemberIdentification({
        id,
        firstName,
        lastName,
        email,
        phone,
        avatar,
        memberTier,
        legacyAnokoMember,
        legacyAnokoCommunity
      })
        .then(() =>
          res.status(201).send({ message: 'Member ID successufully updated' })
        )
        .catch(error => next(error));
    })

    .catch(error => next(error));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberIdentificationById({ id })
        .then(member => {
          if (member === undefined) {
            res.status(404).send({ message: 'Member does not exist...' });
          }
        })
        .catch(error => next(error));
      MemberTable.deleteMemberIdentification({ id })
        .then(() =>
          res.status(200).send({ message: 'Member ID successfully deleted' })
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

module.exports = router;
