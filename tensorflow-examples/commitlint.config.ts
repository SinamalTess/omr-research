import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [2, 'always', ['docs', 'vision', 'config', 'other', '*']]
    }
};

module.exports = Configuration;
