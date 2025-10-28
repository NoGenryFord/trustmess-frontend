import { expect, it, describe, vi, beforeAll, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

import { getUserById, getUsers } from '/src/api/requests';

describe('User by ID Get API request', () => {
  const fakeUser = {
    id: 1,
    username: 'testUser1',
    password: 'testUser2',
    isAdmin: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get user info from db with id', async () => {
    axios.get.mockResolvedValue({ data: fakeUser });

    const result = await getUserById('1');

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users/1'));
    expect(result).toEqual(fakeUser);
  });
});

describe('getUsers test', () => {
  const fakeUsers = [
    {
      id: 1,
      username: 'testUser1',
      password: 'testUser1',
      isAdmin: true,
    },
    {
      id: 2,
      username: 'testUser2',
      password: 'testUser2',
      isAdmin: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('return list of all users', async () => {
    axios.get.mockResolvedValue({ data: fakeUsers });

    const result = await getUsers();

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
    expect(result).toEqual(fakeUsers);
  });
});
