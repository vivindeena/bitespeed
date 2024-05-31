CREATE TABLE Contact (
  id SERIAL PRIMARY KEY,
  phoneNumber VARCHAR,
  email VARCHAR,
  linkedId INTEGER REFERENCES Contact(id),
  linkPrecedence VARCHAR(10) CHECK (linkPrecedence IN ('primary', 'secondary')),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_linkedId ON Contact(linkedId);
CREATE INDEX IF NOT EXISTS idx_contact_email ON Contact(email);
CREATE INDEX IF NOT EXISTS idx_contact_phoneNumber ON Contact(phoneNumber);