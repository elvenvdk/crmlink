const pool = require('../../databasePool');

class MemberTable {
  // member id
  static getAllMemberIdentification() {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM member_id ORDER BY last_name ASC',
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows);
        }
      );
    });
  }

  static getMemberIdentificationById({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM member_id WHERE anoko_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static getMemberIdentificationByEmail({ email }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM member_id WHERE email = $1`,
        [email],
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static createMemberIdentification({
    firstName,
    lastName,
    email,
    phone,
    avatar,
    memberTier,
    legacyAnokoMember,
    legacyAnokoCommunity
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO member_id(
          first_name,
          last_name,
          email,
          phone,
          headshot,
          member_tier,
          legacy_anoko_member,
          legacy_anoko_community
        ) VALUES(
          $1, $2, $3, $4, $5, $6, $7, $8
        )`,
        [
          firstName,
          lastName,
          email,
          phone,
          avatar,
          memberTier,
          legacyAnokoMember,
          legacyAnokoCommunity
        ],
        (error, res) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static updateMemberIdentification({
    id,
    firstName,
    lastName,
    email,
    phone,
    avatar,
    memberTier,
    legacyAnokoMember,
    legacyAnokoCommunity
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE member_id SET
          first_name = $1,
          last_name = $2,
          email = $3,
          phone = $4,
          headshot = $5,
          member_tier = $6,
          legacy_anoko_member = $7,
          legacy_anoko_community = $8
        WHERE anoko_id = $9`,
        [
          firstName,
          lastName,
          email,
          phone,
          avatar,
          memberTier,
          legacyAnokoMember,
          legacyAnokoCommunity,
          id
        ],
        (error, res) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static deleteMemberIdentification({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM member_id WHERE anoko_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  // member application
  static getMemberApplications() {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM member_application ORDER BY last_name ASC',
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows);
        }
      );
    });
  }

  static getMemberApplication({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM member_application
          WHERE id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static createMemberApplication({
    first_name,
    last_name,
    pref_name,
    email,
    phone,
    social_media,
    member_referral,
    how_did_you_find_out,
    member_category,
    industry,
    company,
    title,
    current_city,
    current_state,
    first_contact,
    what_do_you_want_from_anoko,
    what_can_you_contribute_to_the_community,
    how_will_you_use_the_space,
    what_does_wealth_mean_to_you
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO member_application(
          first_name,
          last_name,
          pref_name,
          email,
          phone,
          social_media,
          member_referral,
          how_did_you_find_out,
          member_category,
          industry,
          company,
          title,
          current_city,
          current_state,
          first_contact,
          what_do_you_want_from_anoko,
          what_can_you_contribute_to_the_community,
          how_will_you_use_the_space,
          what_does_wealth_mean_to_you
        ) VALUES(
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14, $15,
          $16, $12, $18, $19
        )`,
        [
          first_name,
          last_name,
          pref_name,
          email,
          phone,
          social_media,
          member_referral,
          how_did_you_find_out,
          member_category,
          industry,
          company,
          title,
          current_city,
          current_state,
          first_contact,
          what_do_you_want_from_anoko,
          what_can_you_contribute_to_the_community,
          how_will_you_use_the_space,
          what_does_wealth_mean_to_you
        ],
        (error, res) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static udpateMemberApplication({
    id,
    first_name,
    last_name,
    pref_name,
    email,
    phone,
    social_media,
    member_referral,
    how_did_you_find_out,
    member_category,
    industry,
    company,
    title,
    current_city,
    current_state,
    first_contact,
    what_do_you_want_from_anoko,
    what_can_you_contribute_to_the_community,
    how_will_you_use_the_space,
    what_does_wealth_mean_to_you
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE member_application
        SET
          first_name = $1,
          last_name = $2,
          pref_name = $3,
          email = $4,
          phone = $5,
          social_media = $6,
          member_referral = $7,
          how_did_you_find_out = $8,
          member_category = $9,
          industry = $10,
          company = $11,
          title = $12,
          current_city = $13,
          current_state = $14,
          first_contact = $15,
          what_do_you_want_from_anoko = $16,
          what_can_you_contribute_to_the_community = $17
          how_will_you_use_the_space = $18,
          what_does_wealth_mean_to_you = $19
        WHERE id = $20`,
        [
          first_name,
          last_name,
          pref_name,
          email,
          phone,
          social_media,
          member_referral,
          how_did_you_find_out,
          member_category,
          industry,
          company,
          title,
          current_city,
          current_state,
          first_contact,
          what_do_you_want_from_anoko,
          what_can_you_contribute_to_the_community,
          how_will_you_use_the_space,
          what_does_wealth_mean_to_you,
          id
        ],
        (error, res) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static deleteMemberApplication({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM member_application
        WHERE id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          response();
        }
      );
    });
  }

  // member matchmaking
  static getMemberMatchmaking({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM member_matchmaking
          WHERE anoko_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static crearteMemberMatchMaking({
    anoko_id,
    id_registrationi_complete,
    category,
    age,
    investment_status,
    place_of_upbringing,
    birthplace,
    school_affiliations,
    club_afiliations,
    prev_companies,
    personal_description,
    children,
    business_description,
    favorite_artists_books_podcasts
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO member_matchmaking(
        anoko_id,
        id_registrationi_complete,
        category,
        age,
        investment_status,
        place_of_upbringing,
        birthplace,
        school_affiliations,
        club_afiliations,
        prev_companies,
        personal_description,
        children,
        business_description,
        favorite_artists_books_podcasts
      )
        VALUES (
          $1, $2, $3, $4. $5, $6,
          $7, $8, $9, $10, $11, $12,
          $13, $14
        )`,
        [
          anoko_id,
          id_registrationi_complete,
          category,
          age,
          investment_status,
          place_of_upbringing,
          birthplace,
          school_affiliations,
          club_afiliations,
          prev_companies,
          personal_description,
          children,
          business_description,
          favorite_artists_books_podcasts
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static updateMemberMatchMaking({
    anoko_id,
    id_registrationi_complete,
    category,
    age,
    investment_status,
    place_of_upbringing,
    birthplace,
    school_affiliations,
    club_afiliations,
    prev_companies,
    personal_description,
    children,
    business_description,
    favorite_artists_books_podcasts
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE member_matchmaking
        SET
        id_registrationi_complete = $1,
        category = $2,
        age = $3,
        investment_status = $4,
        place_of_upbringing = $5,
        birthplace = $6,
        school_affiliations = $7,
        club_afiliations = $8,
        prev_companies = $9,
        personal_description = $10,
        children = $11,
        business_description = $12,
        favorite_artists_books_podcasts = $13
        WHERE anoko_id = $14`,
        [
          id_registrationi_complete,
          category,
          age,
          investment_status,
          place_of_upbringing,
          birthplace,
          school_affiliations,
          club_afiliations,
          prev_companies,
          personal_description,
          children,
          business_description,
          favorite_artists_books_podcasts,
          anoko_id
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static removeMemberMatchmaking({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM member_matchmaking
          WHERE anoko_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static getMemberRegistrations() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM member_registration', (error, response) => {
        if (error) return reject(error);
        resolve(response.rows);
      });
    });
  }

  static getMemberRegistration({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM member_registration
        WHERE anoko_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static crearteMemberRegistration({
    anoko_id,
    member_application_confirm,
    engagement_level,
    member_category,
    programming_prefs,
    leisure_activity,
    spending_prefs,
    what_does_wealth_mean_to_you,
    has_paid,
    registration_date
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO member_registration(
          anoko_id,
          member_application_confirm,
          engagement_level,
          member_category,
          programming_prefs,
          leisure_activity,
          spending_prefs,
          what_does_wealth_mean_to_you,
          has_paid,
          registration_date
      )
        VALUES (
          $1, $2, $3, $4. $5, $6,
          $7, $8, $9, $10
        )`,
        [
          anoko_id,
          member_application_confirm,
          engagement_level,
          member_category,
          programming_prefs,
          leisure_activity,
          spending_prefs,
          what_does_wealth_mean_to_you,
          has_paid,
          registration_date
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static updateMemberRegistration({
    anoko_id,
    member_application_confirm,
    engagement_level,
    member_category,
    programming_prefs,
    leisure_activity,
    spending_prefs,
    what_does_wealth_mean_to_you,
    has_paid,
    registration_date
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE member_registration
        SET
          member_application_confirm = $2,
          engagement_level = $3,
          member_category = $4,
          programming_prefs = $5,
          leisure_activity = $6,
          spending_prefs = $7,
          what_does_wealth_mean_to_you = $8,
          has_paid = $9,
          registration_date = $10
        WHERE
          anoko_id = $1
      )`,
        [
          anoko_id,
          member_application_confirm,
          engagement_level,
          member_category,
          programming_prefs,
          leisure_activity,
          spending_prefs,
          what_does_wealth_mean_to_you,
          has_paid,
          registration_date
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static removeMemberReistration({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE from member_registration
        WHERE anoko_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static getMemberTier({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM member_tier
        WHERE member_id = $1`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve(response.rows[0]);
        }
      );
    });
  }

  static createMemberTier({
    member_id,
    partner,
    husle,
    social,
    digital,
    unqualified_lead,
    qualified_lead
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        INSERT INTO member_tier(
          member_id,
          partner,
          husle,
          social,
          digital,
          unqualified_lead,
          qualified_lead
        )
        VALUES(
          $1, $2, $3, $4, $5, $6, $7
        )
      `,
        [
          member_id,
          partner,
          husle,
          social,
          digital,
          unqualified_lead,
          qualified_lead
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static updateMemberTier({
    member_id,
    partner,
    husle,
    social,
    digital,
    unqualified_lead,
    qualified_lead
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        UPDATE member_tier
        SET
          partner = $2,
          husle = $3,
          social = $4,
          digital = $5,
          unqualified_lead = $6,
          qualified_lead = $7
        WHERE
        member_id = $1
      `,
        [
          member_id,
          partner,
          husle,
          social,
          digital,
          unqualified_lead,
          qualified_lead
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  static deleteMemberTier({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM member_tier WHERE member_id = $1',
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

module.exports = MemberTable;
