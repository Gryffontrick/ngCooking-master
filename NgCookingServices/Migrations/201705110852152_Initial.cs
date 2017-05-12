namespace NgCookingServices.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cooks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Firstname = c.String(),
                        Surname = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        Level = c.Int(nullable: false),
                        Picture = c.String(),
                        City = c.String(),
                        Birth = c.Int(nullable: false),
                        Bio = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Cooks");
        }
    }
}
