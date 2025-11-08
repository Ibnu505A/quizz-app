const pool = require('../config/database');

const viewUsers = async () => {
    try {
        const result = await pool.query(
            'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
        );

        console.log('\n📋 DAFTAR USER YANG TERDAFTAR\n');
        console.log('='.repeat(80));

        if (result.rows.length === 0) {
            console.log('Belum ada user yang terdaftar.');
        } else {
            result.rows.forEach((user, index) => {
                console.log(`\n${index + 1}. ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   ID: ${user.id}`);
                console.log(`   Terdaftar: ${new Date(user.created_at).toLocaleString('id-ID')}`);
                console.log('-'.repeat(80));
            });

            console.log(`\n📊 Total: ${result.rows.length} user\n`);
        }

        await pool.end();
    } catch (error) {
        console.error('❌ Error:', error);
        await pool.end();
        process.exit(1);
    }
};

viewUsers();

